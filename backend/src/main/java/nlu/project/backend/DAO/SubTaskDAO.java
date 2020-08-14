package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.issue.SubTaskParams;
import nlu.project.backend.model.*;
import nlu.project.backend.model.security.CustomUserDetails;
import nlu.project.backend.repository.IssueRepository;
import nlu.project.backend.repository.ProjectRepository;
import nlu.project.backend.repository.SubTaskRepository;
import nlu.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

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


    public SubTask create(SubTaskParams params, User user) {
        Issue issue = issueReposistory.getOne(params.issueId);
        SubTask subTask = new SubTask();
        subTask.setName(params.name);
        subTask.setIssue(issue);
        //set code
        String code = issue.getName() + "-" + (issue.getSubTasks().size() + 1);
        subTask.setCode(code);
        // set status
        Project project = projectRepository.getOne(params.projectId);
        List<WorkFlowItem> workFlowItems = project.getCurrentWorkFlow().getItems();
        WorkFlowItem started = workFlowItems.stream().filter(new Predicate<WorkFlowItem>() {
            @Override
            public boolean test(WorkFlowItem workFlowItem) {
                return workFlowItem.isStart();
            }
        }).findFirst().get();
        subTask.setStatus(started);
        //
        return subTaskRepository.save(subTask);
    }

    public SubTask update(SubTaskParams params) {
        User user = userRepository.getOne(params.assignedId);
        Issue issue = issueReposistory.getOne(params.issueId);
        SubTask subTask = subTaskRepository.getOne(params.subtaskId);
        subTask.setAssignment(user);
        subTask.setIssue(issue);
        subTask.setEstimateTime(params.estimateTime);
        return subTaskRepository.save(subTask);
    }

    public void delete(SubTaskParams params) {
        SubTask subTask = subTaskRepository.getOne(params.subtaskId);
        subTaskRepository.delete(subTask);
    }

    public List<SubTask> getSubTaskByIssueID(SubTaskParams params) {
        Issue issue = issueReposistory.getOne(params.issueId);
        return subTaskRepository.getSubTasksByIssue(issue);
    }
}
