package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import nlu.project.backend.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



import java.util.List;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    List<Sprint> findByNameLike(String name);

    List<Sprint> findByNameLikeAndProject(String name, Project project);

}
