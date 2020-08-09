package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.issue.SubTaskParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.SubTask;
import nlu.project.backend.model.User;
import nlu.project.backend.repository.IssueRepository;
import nlu.project.backend.repository.ProjectRepository;
import nlu.project.backend.repository.SubTaskRepository;
import nlu.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@NoArgsConstructor
@Data
public class SubTaskDAO {

    @Autowired
    IssueRepository issueReposistory;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    SubTaskRepository subTaskRepository;


    public SubTask create(SubTaskParams params) {
        User user = userRepository.getOne(params.assignedID);
        Issue issue = issueReposistory.getOne(params.issueID);
        SubTask subTask = new SubTask();
        subTask.setAssignment(user);
        subTask.setIssue(issue);
        subTask.setEstimateTime(params.estimateTime);
        return subTaskRepository.save(subTask);
    }

    public SubTask update(SubTaskParams params) {
        User user = userRepository.getOne(params.assignedID);
        Issue issue = issueReposistory.getOne(params.issueID);
        SubTask subTask = subTaskRepository.getOne(params.subtaskID);
        subTask.setAssignment(user);
        subTask.setIssue(issue);
        subTask.setEstimateTime(params.estimateTime);
        return subTaskRepository.save(subTask);
    }

    public void delete(SubTaskParams params) {
        SubTask subTask = subTaskRepository.getOne(params.subtaskID);
        subTaskRepository.delete(subTask);
    }

    public List<SubTask> getSubTaskByIssueID(SubTaskParams params) {
        Issue issue = issueReposistory.getOne(params.issueID);
        return subTaskRepository.getSubTasksByIssue(issue);
    }
}
