package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query(value = "SELECT * FROM project p WHERE p.id IN (SELECT user_role.project_id FROM user_role WHERE user_role.user_id = :owner_id)", nativeQuery = true)
    List<Project> findJointIn(@Param("owner_id") Integer userId);
}
