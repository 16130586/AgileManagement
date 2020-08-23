package nlu.project.backend.repository;

import nlu.project.backend.model.Comment;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.SubTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByIssue(Issue issue);
    List<Comment> findBySubTask(SubTask subTask);
}
