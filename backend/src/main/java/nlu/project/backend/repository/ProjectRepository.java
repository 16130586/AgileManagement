package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    boolean existsByName(String name);
    boolean existsByCode(String code);

    List<Project> findByKey(String key);

    List<Project> findByName(String name);
}
