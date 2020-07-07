package nlu.project.backend.repository;

import nlu.project.backend.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {
}
