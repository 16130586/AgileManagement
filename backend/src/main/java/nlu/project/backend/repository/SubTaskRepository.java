package nlu.project.backend.repository;

import nlu.project.backend.model.Issue;
import nlu.project.backend.model.SubTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTaskRepository extends JpaRepository<SubTask, Integer> {

    List<SubTask> getSubTasksByIssue(Issue issue);
}
