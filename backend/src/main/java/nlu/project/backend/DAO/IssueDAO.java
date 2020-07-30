package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@NoArgsConstructor
@Data
public class IssueDAO {

    @Autowired
    IssueRepository issueRepository;

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
    WorkFlowItemRepository workFlowItemRepository;

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
        toSave.setStatus(workFlowItemRepository.getOne(issueParams.workflowItemId));

        return issueRepository.save(toSave);
    }

    public Issue update(IssueParams issueParams) {
        Issue toSave = issueRepository.getOne(issueParams.id);

        toSave.setName(issueParams.name);
        toSave.setDescription(issueParams.name);
        toSave.setHours(issueParams.hours);
        toSave.setCode(issueParams.code);
        toSave.setAssignment(userRepository.getOne(issueParams.userAssignment));
        toSave.setPriority(priorityRepository.getOne(issueParams.priorityId));
        toSave.setIssueType(issueTypeRepository.getOne(issueParams.issueType));
        toSave.setStatus(workFlowItemRepository.getOne(issueParams.workflowItemId));

        return issueRepository.save(toSave);
    }

    public boolean delete(int issueId) {
        try{
            issueRepository.deleteById(issueId);
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
            if (filter.workflowItemId != null) {
                WorkFlowItem workFlow = workFlowItemRepository.getOne(filter.workflowItemId);
                return issueRepository.findByNameLikeAndCodeLikeAndStatusAndAssignment(name, code, workFlow, assignment);
            }
            return issueRepository.findByNameLikeAndCodeLikeAndAssignment(name, code, assignment);
        }
        if (filter.workflowItemId != null) {
            WorkFlowItem workFlow = workFlowItemRepository.getOne(filter.workflowItemId);
            return issueRepository.findByNameLikeAndCodeLikeAndStatus(name, code, workFlow);
        }
        return issueRepository.findByNameLikeAndCodeLike(name, code);
    }

    public IssueType createIssueType(IssueTypeParams entryParams){
        IssueType result = null;
        try {
            Project project = projectRepository.getOne(entryParams.getProjectId());
            result = new IssueType();
            result.setName(entryParams.getName());
            result.setIconUrl(entryParams.getIconUrl());
            result.setProject(project);
            issueTypeRepository.save(result);
        }catch (Exception e){
            result = null;
            System.out.println(e.getMessage());
        }
            return result;
    }
}
