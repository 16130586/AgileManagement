package nlu.project.backend.repository;

import nlu.project.backend.model.Group;
import nlu.project.backend.model.User;
import nlu.project.backend.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Integer> {

    UserGroup findByUserAndGroup(User user, Group group);
}
