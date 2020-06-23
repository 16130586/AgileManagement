package nlu.project.backend.repository;

import nlu.project.backend.model.BackLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BacklogRepository extends JpaRepository<BackLog, Integer> {
}
