package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.entry.filter.ProjectFilterParams;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.entry.project.WorkFlowParams;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import nlu.project.backend.util.constraint.ConstraintRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@NoArgsConstructor
@Data
public class ProjectDAO {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    BacklogRepository backlogRepository;

    @Autowired
    FileBusiness fileBusiness;

    @Autowired
    WorkflowRepository workflowRepository;

    @Autowired
    WorkFlowItemRepository itemRepository;

    public boolean isExistedProjectName(String name) {
        return projectRepository.existsByName(name);
    }

    public boolean isExistedProjectCode(String code) {
        return projectRepository.existsByCode(code);
    }

    public Project getProjectById(int id) {
        return projectRepository.findById(id).get();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW , rollbackFor = IllegalArgumentException.class)
    public Project save(ProjectParams projectParams) {
        String imgUrl = fileBusiness.save(projectParams.file);
        // Project
        Project project = new Project();
        project.setName(projectParams.name);
        project.setCode(projectParams.key);
        project.setDescription(projectParams.description);
        project.setImgUrl(imgUrl);
        projectRepository.save(project);
        // Backlog
        BackLog backLog = new BackLog();
        backLog.setProject(project);
        backlogRepository.save(backLog);

        if(projectParams.leader != projectParams.productOwner){
            // Leader
            User teamLead = userRepository.findById(projectParams.leader).get();
            Role leadRole = roleRepository.findByName(ConstraintRole.TEAM_LEAD);
            UserRole leader = new UserRole();
            leader.setUser(teamLead);
            leader.setRole(leadRole);
            leader.setProject(project);
            userRoleRepository.save(leader);
            // Product Owner
            User creator = userRepository.findById(projectParams.productOwner).get();
            Role poRole = roleRepository.findByName(ConstraintRole.PRODUCT_OWNER);
            UserRole productOwner = new UserRole();
            productOwner.setUser(creator);
            productOwner.setRole(poRole);
            productOwner.setProject(project);
            userRoleRepository.save(productOwner);
            projectRepository.save(project);

            project.setOwner(creator);
            project.setLeader(teamLead);
            projectRepository.save(project);
        }else {
            User creator = userRepository.findById(projectParams.productOwner).get();
            Role poRole = roleRepository.findByName(ConstraintRole.PRODUCT_OWNER);
            UserRole productOwner = new UserRole();
            productOwner.setUser(creator);
            productOwner.setRole(poRole);
            productOwner.setProject(project);
            userRoleRepository.save(productOwner);
            project.setOwner(creator);
            project.setLeader(creator);
            projectRepository.save(project);
        }
        // End
        return project;
    }
    @Transactional(propagation = Propagation.REQUIRES_NEW , rollbackFor = IllegalArgumentException.class)
    public Project update(Project project, ProjectParams projectParams) {
        Role leadRole = roleRepository.findByName(ConstraintRole.TEAM_LEAD);
        UserRole leader = userRoleRepository.findByRoleAndProject(leadRole, project);
        if (leader.getUser().getId() != projectParams.leader) {
            User newTeamLead = userRepository.findById(projectParams.leader).get();
            leader.setUser(newTeamLead);
            userRoleRepository.save(leader);
        }
        project.setName(projectParams.name);
        project.setCode(projectParams.key);
        project.setDescription(projectParams.description);
        projectRepository.save(project);
        return project;
    }
    @Transactional(propagation = Propagation.REQUIRES_NEW , rollbackFor = IllegalArgumentException.class)
    public boolean delete(int projectId) {
        try {
            projectRepository.deleteById(projectId);
        }
        catch (Exception e) {
            return false;
        }
        return true;
    }

    public List<Project> findByNameLike(String name) {
        return projectRepository.findByNameLike(name);
    }

    public List<Project> findByCode(String key) {
        return projectRepository.findByCode(key);
    }
    public List<Project> findByKeyLike(String key) {
        return projectRepository.findByCodeLike(key);
    }

    public List<Project> findByUser(int userId) {
        User user = userRepository.getOne(userId);
        List<Project> result = new ArrayList<>();
        List<UserRole> userRoles = userRoleRepository.findByUser(user);
        for (UserRole i : userRoles) {
            result.add(i.getProject());
        }
        return result;
    }

    public List<Project> findByOwner(int ownerId) {
        User user = userRepository.getOne(ownerId);
        List<Project> result = new ArrayList<>();
        List<UserRole> userRoles = userRoleRepository.findByUser(user);
        for (UserRole i : userRoles) {
            if (i.getRole().getId() == 1)
                result.add(i.getProject());
        }
        return result;
    }

    public List<Project> findByFilter(ProjectFilterParams filter) {
        List<Project> result;
        String name = (filter.name == null) ? "" : filter.name;
        String key = (filter.key == null) ? "" : filter.key;
        if ( (filter.name != null) || (filter.key != null) ) {
            result = projectRepository.findByNameLikeAndCodeLike(name, key);
            result = filterByUserId(result, filter);
            result = filterByOwnerId(result, filter);
            return  result;
        }
        if (filter.userId != null) {
            result = findByUser(filter.userId);
            result = filterByOwnerId(result, filter);
            return result;
        }
        if (filter.ownerId != null)
            return findByOwner(filter.ownerId);
        return findByNameLike("");
    }

    public List<Project> filterByOwnerId(List<Project> projectList, ProjectFilterParams filter) {
        if (filter.ownerId == null)
            return projectList;

        List<Project> result = new ArrayList<>();
        User owner = userRepository.getOne(filter.ownerId);
        UserRole userRole;
        for(Project project : projectList) {
            userRole = userRoleRepository.findByUserAndProject(owner, project);
            if (userRole != null && userRole.getRole().getId() == 1)
                result.add(project);
        }
        return result;
    }

    public List<Project> filterByUserId(List<Project> projectList, ProjectFilterParams filter) {
        if (filter.userId == null)
            return projectList;

        List<Project> result = new ArrayList<>();
        User owner = userRepository.getOne(filter.ownerId);
        UserRole userRole;
        for(Project project : projectList) {
            userRole = userRoleRepository.findByUserAndProject(owner, project);
            if (userRole != null )
                result.add(project);
        }
        return result;
    }
    public List<Project> findJointIn(int userId){
        return projectRepository.findJointIn(userId);
    }

    public WorkFlow createWorkFlow(WorkFlowParams params) {
        Project project = getProjectById(params.projectId);
        WorkFlow workFlow = new WorkFlow();
        workFlow.setName(params.name);
        workFlow.setProject(project);
        return workflowRepository.save(workFlow);
    }

    public WorkFlowItem addWorkFlowItem(WorkFlowParams params) {
        WorkFlow workFlow = workflowRepository.getOne(params.id);
        WorkFlowItem item = new WorkFlowItem();
        item.setName(params.itemName);
        item.setWorkFlow(workFlow);
        return itemRepository.save(item);
    }

    public WorkFlowItem addLinkWorkFlow(WorkFlowParams params) {
        WorkFlowItem item = itemRepository.getOne(params.fromItemId);
        WorkFlowItem toItem = itemRepository.getOne(params.toItemId);
        item.getNextItems().add(toItem);
        return itemRepository.save(item);
    }

    public WorkFlowItem deleteLinkWorkFlow(WorkFlowParams params) {
        WorkFlowItem item = itemRepository.getOne(params.fromItemId);
        WorkFlowItem toItem = itemRepository.getOne(params.toItemId);
        item.getNextItems().remove(toItem);
        return itemRepository.save(item);
    }

    public WorkFlow deleteWorkFlowItem(WorkFlowParams params) {
        WorkFlowItem item = itemRepository.getOne(params.toItemId);
        itemRepository.delete(item);
        return workflowRepository.getOne(params.id);
    }
}
