package nlu.project.backend.repository;

import nlu.project.backend.model.Project;
import nlu.project.backend.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Date;
import java.util.List;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    List<Sprint> findByNameLike(String name);

    List<Sprint> findByProjectId(Integer projectId);

    @Query(value = "SELECT * FROM sprint sprt " +
            "WHERE sprt.name LIKE %:name% " +
            "AND sprt.project_id = :projectId " +
            "AND sprt.status = :status", nativeQuery = true)
    List<Sprint >findByNameContainingIgnoreCaseAndProjectIdAndStatus(
            @Param(value="name") String name ,
            @Param(value="projectId") Integer projectId ,
            @Param(value="status") Integer status);

    @Query(value = "SELECT * FROM sprint sprt " +
            "WHERE sprt.project_id = :projectId " +
            "AND (sprt.status = 0 OR sprt.status = 1) ORDER BY sprt._order ASC", nativeQuery = true)
    List<Sprint> findWorkingSprints(@Param(value="projectId") Integer projectId);

}
