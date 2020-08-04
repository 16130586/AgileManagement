package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import nlu.project.backend.model.WorkFlow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkflowRepository extends JpaRepository<WorkFlow, Integer> {
    List<WorkFlow> findByProject(Project project);
}
