package nlu.project.backend.repository;

import nlu.project.backend.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.criteria.CriteriaBuilder;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {
}
