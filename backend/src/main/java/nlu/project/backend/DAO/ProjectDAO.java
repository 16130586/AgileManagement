package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.entry.project.ProjectParams;
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
        }else {
            User creator = userRepository.findById(projectParams.productOwner).get();
            Role poRole = roleRepository.findByName(ConstraintRole.PRODUCT_OWNER);
            UserRole productOwner = new UserRole();
            productOwner.setUser(creator);
            productOwner.setRole(poRole);
            productOwner.setProject(project);
            userRoleRepository.save(productOwner);
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

    public List<Project> findByName(String name) {
        return projectRepository.findByName(name);
    }

    public List<Project> findByCode(String key) {
        return projectRepository.findByCode(key);
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
}
