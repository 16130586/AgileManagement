package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import nlu.project.backend.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    List<Sprint> findByNameLike(String name);

    List<Sprint> findByNameLikeAndProject(String name, Project project);

}
