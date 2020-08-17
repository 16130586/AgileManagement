package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.issue.SubTaskParams;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
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

    @Autowired
    WorkFlowItemRepository workFlowItemRepository;

    @Autowired
    LogWorkRepository logWorkRepository;


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
        SubTask subTask = subTaskRepository.getOne(params.subtaskId);
        if (params.assignedId != null) {
            User user = userRepository.getOne(params.assignedId);
            subTask.setAssignment(user);
        }
        if (params.estimateTime != null) {
            subTask.setEstimateTime(params.estimateTime);
        }
        if (params.name != null) {
            subTask.setName(params.name);
        }
        if (params.description != null) {
            subTask.setDescription(params.description);
        }
        if (params.workFlowStatus != null) {
            subTask.setStatus(workFlowItemRepository.getOne(params.workFlowStatus));
        }
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

    public SubTask getSubTaskById(int subTaskId) {
        return subTaskRepository.getOne(subTaskId);
    }


    public LogWork logWork(SubTaskParams params, User owner) {
        SubTask subTask = getSubTaskById(params.subtaskId);
        LogWork logWork = new LogWork();
        logWork.setOwner(owner);
        logWork.setSubTask(subTask);
        logWork.setHours(params.logWorkTime);
        logWork.setDate(new Date());
        return logWorkRepository.save(logWork);
    }
}
