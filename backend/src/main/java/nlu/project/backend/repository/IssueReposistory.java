package nlu.project.backend.repository;

import nlu.project.backend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueReposistory extends JpaRepository<Issue, Integer> {
}
