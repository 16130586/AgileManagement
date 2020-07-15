package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    boolean existsByName(String name);
    boolean existsByCode(String code);

    List<Project> findByCode(String key);

    List<Project> findByCodeLike(String code);

    List<Project> findByNameLike(String name);

    List<Project> findByNameLikeAndCodeLike(String name, String code);
}
