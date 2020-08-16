package nlu.project.backend.repository;

import nlu.project.backend.model.SprintVelocity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SprintVelocityRepository extends JpaRepository<SprintVelocity, Integer> {
}
