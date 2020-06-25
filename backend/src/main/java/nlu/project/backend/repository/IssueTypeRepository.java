package nlu.project.backend.repository;

import nlu.project.backend.model.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueTypeRepository extends JpaRepository<IssueType, Integer> {
}
