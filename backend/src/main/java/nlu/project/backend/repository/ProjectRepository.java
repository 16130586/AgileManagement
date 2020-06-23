package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    boolean existsByName(String name);
    boolean existsByCode(String code);

}
