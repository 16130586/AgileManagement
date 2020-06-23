package nlu.project.backend.business.impl;

import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.exception.custom.InternalException;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import nlu.project.backend.util.constraint.ConstraintRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
public class ProjectBusinessImpl implements ProjectBusiness {
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

    @Override
    @Secured("ROLE_USER")
    public Project create(ProjectParams projectParams, UserDetails userDetails) {
        if (projectRepository.existsByName(projectParams.name))
            throw new InvalidInputException("Project's Name already exists");
        if (projectRepository.existsByCode(projectParams.key))
            throw new InvalidInputException("Project's Key already exists");

        try {
            // Project
            Project project = new Project();
            project.setName(projectParams.name);
            project.setCode(projectParams.key);
            projectRepository.save(project);
            // Backlog
            BackLog backLog = new BackLog();
            backLog.setProject(project);
            backlogRepository.save(backLog);
            // Leader
            User teamLead = userRepository.findById(projectParams.leader).get();
            Role leadRole = roleRepository.findByName(ConstraintRole.TEAM_LEAD);
            UserRole leader = new UserRole();
            leader.setUser(teamLead);
            leader.setRole(leadRole);
            leader.setProject(project);
            userRoleRepository.saveAndFlush(leader);
            // Product Owner
            User creator = userRepository.findByUserName(userDetails.getUsername());
            Role poRole = roleRepository.findByName(ConstraintRole.PRODUCT_OWNER);
            UserRole productOwner = new UserRole();
            productOwner.setUser(creator);
            productOwner.setRole(poRole);
            productOwner.setProject(project);
            userRoleRepository.save(productOwner);
            // End
            return project;
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalException("Internal Error");
        }
    }

    @Override
    @Secured("ROLE_USER")
    public Project update(ProjectParams projectParams) {
        Project project = projectRepository.findById(projectParams.id).get();
        // Check New Name != Old Name && Existed
        if (!projectParams.name.equals(project.getName()) && projectRepository.existsByName(projectParams.name))
            throw new InvalidInputException("Project's Name already exists");
        // Check New Code != Old Code && Existed
        if (!projectParams.key.equals(project.getCode()) && projectRepository.existsByCode(projectParams.key))
            throw new InvalidInputException("Project's Key already exists");

        try {
            // Update Team Lead
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
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalException("Internal Error");
        }
    }

    @Override
    public boolean delete() {
        return false;
    }
}
