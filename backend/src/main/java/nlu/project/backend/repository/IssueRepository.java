package nlu.project.backend.repository;

import nlu.project.backend.model.Issue;
import nlu.project.backend.model.User;
import nlu.project.backend.model.WorkFlowItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {

    List<Issue> findByNameLikeAndCodeLike(String name, String code);

    List<Issue> findByNameLikeAndCodeLikeAndStatus(String name, String code, WorkFlowItem item);

    List<Issue> findByNameLikeAndCodeLikeAndAssignment(String name, String code, User assignment);

    List<Issue> findByNameLikeAndCodeLikeAndStatusAndAssignment(String name, String code, WorkFlowItem status, User assignment);
}
