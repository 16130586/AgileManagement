package nlu.project.backend.DAO;

import jdk.nashorn.internal.runtime.regexp.joni.exception.InternalException;
import lombok.NoArgsConstructor;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class UserDAO {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    ProjectRepository projectRepository;


    @Autowired
    RoleRepository roleRepository;

    @Autowired
    BacklogRepository backlogRepository;

    public User getUser(Integer id) {
        return userRepository.getOne(id);
    }

    public User getUser(String usermail){
        return userRepository.findByEmail(usermail);
    }
    public boolean isProductOwner(int userId, int projectId) {
        User user = userRepository.getOne(userId);
        //BackLog backlog = backlogRepository.getOne(backlogId);
        //Project project = backlog.getProject();
        Project project = projectRepository.getOne(projectId);
        UserRole userRole = userRoleRepository.findByUserAndProject(user, project);
        if (userRole == null)
            return false;
        return userRole.getRole().getId() == 1;
    }

    public boolean isProductOwnerWithProjectId(int userId, int projectId) {
        User user = userRepository.getOne(userId);
        Project project = projectRepository.getOne(projectId);
        UserRole userRole = userRoleRepository.findByUserAndProject(user, project);
        if (userRole == null)
            return false;
        return userRole.getRole().getId() == 1;
    }

    public boolean isInProject(Integer projectId, Integer userId) {
        try {
            UserRole userRole = userRoleRepository
                    .findByUserAndProject(userRepository.getOne(userId) , projectRepository.getOne(projectId));
            if (userRole != null)
                return true;
            return false;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new InternalException(e.getMessage());
        }
    }

    public User getUserByUserName(String userName) {
        try {
            return userRepository.findByUserName(userName);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new InternalException(e.getMessage());
        }
    }
}
