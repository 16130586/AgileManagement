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

import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;

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
        if(issueParams.id != null && issueParams.id > 0)
            toSave.setId(issueParams.id);

        toSave.setDescription(issueParams.description);
        toSave.setHours(issueParams.hours);
        toSave.setCode(issueParams.code);
        if(issueParams.storyPoint == null)
            toSave.setStoryPoint(0);
        else
            toSave.setStoryPoint(issueParams.storyPoint);
        Project project = projectRepository.getOne(issueParams.projectId);
        toSave.setName(project.getCode().toUpperCase() + "-" + (project.getBacklog().getIssues().size() + 1));
        if(issueParams.backlogId != null)
            toSave.setBackLog(backlogRepository.getOne(issueParams.backlogId));
        else
            toSave.setBackLog(project.getBacklog());
        if(issueParams.userAssignment != null)
            toSave.setAssignment(userRepository.getOne(issueParams.userAssignment));
        if(issueParams.priorityId != null)
            toSave.setPriority(priorityRepository.getOne(issueParams.priorityId));
        toSave.setIssueType(issueTypeRepository.getOne(issueParams.issueTypeId));
        if(issueParams.workflowItemId != null)
            toSave.setStatus(workFlowItemRepository.getOne(issueParams.workflowItemId));
        else {
            List<WorkFlowItem> workFlowItems = project.getCurrentWorkFlow().getItems();
            WorkFlowItem started = workFlowItems.stream().filter(new Predicate<WorkFlowItem>() {
                @Override
                public boolean test(WorkFlowItem workFlowItem) {
                    return workFlowItem.isStart();
                }
            }).findFirst().get();
            toSave.setStatus(started);
        }
        if(issueParams.sprintId != null && issueParams.sprintId > 0){
            toSave.setSprint(sprintRepository.getOne(issueParams.sprintId));
        }
        return issueRepository.save(toSave);
    }

    public Issue patch(IssueParams issueParams) {
        Issue toSave = issueRepository.getOne(issueParams.id);

        toSave.setName(issueParams.name);
        toSave.setDescription(issueParams.description);
        toSave.setHours(issueParams.hours);
        toSave.setCode(issueParams.code);
        toSave.setAssignment(userRepository.getOne(issueParams.userAssignment));
        toSave.setPriority(priorityRepository.getOne(issueParams.priorityId));
        toSave.setIssueType(issueTypeRepository.getOne(issueParams.issueTypeId));
        toSave.setStatus(workFlowItemRepository.getOne(issueParams.workflowItemId));

        return issueRepository.save(toSave);
    }
    public Issue update(Issue iss){
        return issueRepository.saveAndFlush(iss);
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
    public List<Issue> findInBacklog(Integer backlogId){
        try{
            return issueRepository.findInBacklog(backlogId);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        return Collections.emptyList();
    }

    public Issue getOne(int issueId) {
        return issueRepository.getOne(issueId);
    }
}
