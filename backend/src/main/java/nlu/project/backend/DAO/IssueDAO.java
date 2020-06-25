package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Data
public class IssueDAO {

    @Autowired
    IssueReposistory issueReposistory;

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
}
