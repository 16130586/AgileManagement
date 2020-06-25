package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.model.BackLog;
import nlu.project.backend.model.Project;
import nlu.project.backend.model.User;
import nlu.project.backend.model.UserRole;
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

        UserRole role = userRoleRepository.findByUserAndProject(user, project);
        if (role == null)
            return false;
        return true;
    }
}
