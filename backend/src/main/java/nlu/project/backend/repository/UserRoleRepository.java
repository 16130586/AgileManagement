package nlu.project.backend.repository;
import nlu.project.backend.model.Project;
import nlu.project.backend.model.Role;
import nlu.project.backend.model.User;
import nlu.project.backend.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    UserRole findByRoleAndProject(Role role, Project project);
    UserRole findByUserAndProject(User user, Project project);
    UserRole findByUserAndProjectAndRole(User user, Project project, Role role);
    List<UserRole> findByUser(User user);
    boolean existsByUserAndProject(User user, Project project);
}
