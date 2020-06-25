package nlu.project.backend.repository;

import nlu.project.backend.model.WorkFlow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRepository extends JpaRepository<WorkFlow, Integer> {
}
