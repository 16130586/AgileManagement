package nlu.project.backend.repository;

import nlu.project.backend.model.WorkFlowItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowItemRepository extends JpaRepository<WorkFlowItem, Integer> {
}
