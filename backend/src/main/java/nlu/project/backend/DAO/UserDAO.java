package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Data
public class UserDAO {

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

    public boolean isProductOwner(int userId, int backlogId) {
        User user = userRepository.getOne(userId);
        BackLog backlog = backlogRepository.getOne(backlogId);
        Project project = backlog.getProject();

        UserRole userRole = userRoleRepository.findByUserAndProject(user, project);
        if (userRole == null)
            return false;
        if (userRole.getRole().getId() == 1)
            return false;
        return true;
    }
}
