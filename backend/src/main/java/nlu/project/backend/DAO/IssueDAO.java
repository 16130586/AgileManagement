package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.User;
import nlu.project.backend.model.WorkFlow;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@NoArgsConstructor
@Data
public class IssueDAO {

    @Autowired
    IssueRepository issueReposistory;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    BacklogRepository backlogRepository;

    @Autowired
    PriorityRepository priorityRepository;

    @Autowired
    SprintRepository sprintRepository;

    @Autowired
    IssueTypeRepository issueTypeRepository;

    @Autowired
    WorkflowRepository workflowRepository;

    public Issue save(IssueParams issueParams) {
        Issue toSave = new Issue();

        toSave.setName(issueParams.name);
        toSave.setDescription(issueParams.name);
        toSave.setHours(issueParams.hours);
        toSave.setCode(issueParams.code);
        toSave.setBackLog(backlogRepository.getOne(issueParams.backlogId));
        toSave.setAssignment(userRepository.getOne(issueParams.userAssignment));
        toSave.setPriority(priorityRepository.getOne(issueParams.priorityId));
        toSave.setIssueType(issueTypeRepository.getOne(issueParams.issueType));
        toSave.setWorkFlow(workflowRepository.getOne(issueParams.workflowId));

        return issueReposistory.save(toSave);
    }

    public Issue update(IssueParams issueParams) {
        Issue toSave = issueReposistory.getOne(issueParams.id);

        toSave.setName(issueParams.name);
        toSave.setDescription(issueParams.name);
        toSave.setHours(issueParams.hours);
        toSave.setCode(issueParams.code);
        toSave.setAssignment(userRepository.getOne(issueParams.userAssignment));
        toSave.setPriority(priorityRepository.getOne(issueParams.priorityId));
        toSave.setIssueType(issueTypeRepository.getOne(issueParams.issueType));
        toSave.setWorkFlow(workflowRepository.getOne(issueParams.workflowId));

        return issueReposistory.save(toSave);
    }

    public boolean delete(int issueId) {
        try{
            issueReposistory.deleteById(issueId);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public List<Issue> findByFilter(IssueFilterParams filter) {
        List<Issue> result;
        String name = (filter.name == null) ? "" : filter.name;
        String code = (filter.code == null) ? "" : filter.code;

        if (filter.assignment != null) {
            User assignment = userRepository.getOne(filter.assignment);
            if (filter.workflowId != null) {
                WorkFlow workFlow = workflowRepository.getOne(filter.workflowId);
                return issueReposistory.findByNameLikeAndCodeLikeAndWorkflowAndAssignment(name, code, workFlow, assignment);
            }
            return issueReposistory.findByNameLikeAndCodeLikeAndAssignment(name, code, assignment);
        }
        if (filter.workflowId != null) {
            WorkFlow workFlow = workflowRepository.getOne(filter.workflowId);
            return issueReposistory.findByNameLikeAndCodeLikeAndWorkflow(name, code, workFlow);
        }
        return issueReposistory.findByNameLikeAndCodeLike(name, code);
    }
}
