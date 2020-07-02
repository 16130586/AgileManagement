package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    boolean existsByName(String name);
    boolean existsByCode(String code);

    @Query("FROM Project WHERE description like %1%")
    List<Project> findbyDescription(String description);

    @Query("FROM Project WHERE key like %1%")
    List<Project> findbyKey(String description);

    @Query("FROM Project WHERE name like %1%")
    List<Project> findbyName(String description);
}
