package nlu.project.backend.repository;

import nlu.project.backend.model.SprintVelocity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintVelocityRepository extends JpaRepository<SprintVelocity, Integer> {
    List<SprintVelocity> findByProjectId(Integer projectId);
}
