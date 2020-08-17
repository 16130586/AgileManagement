package nlu.project.backend.repository;

import nlu.project.backend.model.Group;
import nlu.project.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
    List<Group> findByOwnerOrMemberContains(User owner, User member);
}
