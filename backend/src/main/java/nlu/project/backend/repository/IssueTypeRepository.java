package nlu.project.backend.repository;

import nlu.project.backend.model.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueTypeRepository extends JpaRepository<IssueType, Integer> {
    List<IssueType> findAllByProjectId(Integer projectId);

    @Query(value = "SELECT * FROM issue_type ist WHERE ist.project_id IS NULL", nativeQuery = true)
    List<IssueType> findDefaultIssueTypes();
}
