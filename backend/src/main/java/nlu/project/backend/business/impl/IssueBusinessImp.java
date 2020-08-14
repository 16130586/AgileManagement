package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.IssueDAO;
import nlu.project.backend.DAO.SubTaskDAO;
import nlu.project.backend.DAO.SprintDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.*;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.SubTaskParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.SubTask;
import nlu.project.backend.model.User;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.entry.issue.MoveToBacklog;
import nlu.project.backend.entry.issue.MoveToParams;
import nlu.project.backend.model.*;
import nlu.project.backend.model.security.CustomUserDetails;
import nlu.project.backend.repository.IssueTypeRepository;
import nlu.project.backend.repository.PriorityRepository;
import nlu.project.backend.repository.WorkFlowItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.Collections;
import java.util.List;

@Service
public class IssueBusinessImp implements IssueBusiness {

    @Autowired
    IssueDAO issueDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    SubTaskDAO subTaskDAO;

    @Autowired
    FileBusiness fileBusiness;

    @Autowired
    SprintDAO sprintDAO;

    @Autowired
    IssueTypeRepository issueTypeRepository;

    @Autowired
    WorkFlowItemRepository workFlowItemRepository;

    @Autowired
    PriorityRepository priorityRepository;

    @Override
    public Issue create(IssueParams issueParams, UserDetails userDetails) {
        User user = ((CustomUserDetails) userDetails).getUser();

        if (!userDAO.isProductOwner(user.getId(), issueParams.projectId))
            throw new InvalidParameterException("Invalid parameters!");
        return issueDAO.save(issueParams);
    }

    @Override
    public Issue update(IssueParams issueParams, UserDetails userDetails) throws InvalidParameterException {
        User user = ((CustomUserDetails) userDetails).getUser();

        if (!userDAO.isProductOwner(user.getId(), issueParams.projectId))
            throw new InvalidParameterException("Invalid parameters!");
        return issueDAO.patch(issueParams);
    }

    @Override
    public boolean delete(IssueParams issueParams, UserDetails userDetails) throws InvalidParameterException {
        User user = ((CustomUserDetails) userDetails).getUser();

        if (!userDAO.isProductOwner(user.getId(), issueParams.projectId))
            throw new InvalidParameterException("Invalid parameter!");
        return issueDAO.delete(issueParams.id);
    }

    @Override
    public List<Issue> findByFilter(IssueFilterParams filter) {
        return issueDAO.findByFilter(filter);
    }

    @Override
    public SubTask createSubTask(SubTaskParams params, User user) {
        return subTaskDAO.create(params, user);
    }

    @Override
    public SubTask updateSubTask(SubTaskParams params) {
        return subTaskDAO.update(params);
    }

    @Override
    public void deleteSubTask(SubTaskParams params) {
        subTaskDAO.delete(params);
    }

    @Override
    public List<SubTask> getSubTaskByIssueID(SubTaskParams params) {
        return subTaskDAO.getSubTaskByIssueID(params);
    }

    @Override
    public IssueType createIssueType(IssueTypeParams issueTypeParams) throws InvalidParameterException {

        boolean isRight = userDAO.isProductOwnerWithProjectId(issueTypeParams.getProjectId(), issueTypeParams.getCreateByUserId());
        if (!isRight) throw new InvalidParameterException("You can't add new issue type to this project");
        String iconUrl = null;
        if (issueTypeParams.getIconFile() != null)
            iconUrl = fileBusiness.save(issueTypeParams.getIconFile());
        issueTypeParams.setIconFile(null);
        issueTypeParams.setIconUrl(iconUrl);
        IssueType result = issueDAO.createIssueType(issueTypeParams);
        return result;
    }

    @Override
    public List<Issue> findInBacklog(Integer backlogId) {
        return issueDAO.findInBacklog(backlogId);
    }

    @Override
    public Issue moveIssueToSprint(MoveToParams params, CustomUserDetails cusUser) {
        User user = cusUser.getUser();
        if (params.fromSprintId != null && params.fromSprintId > 0) {
            Sprint from = sprintDAO.getOne(params.fromSprintId);
            Sprint to = sprintDAO.getOne(params.toSprintId);

            Project fromProject = from.getProject();
            Project toProject = to.getProject();
            boolean isFromOwner = userDAO.isProductOwner(user.getId(), fromProject.getId());
            boolean isToOwner = userDAO.isProductOwner(user.getId(), toProject.getId());
            if (!(isFromOwner && isToOwner))
                throw new InvalidParameterException("Invalid parameters!");

            Issue iss = issueDAO.getOne(params.issueId);
            iss.setSprint(to);
            iss = issueDAO.update(iss);

            from.getIssues().remove(iss);
            sprintDAO.update(from);

            to.getIssues().add(iss);
            sprintDAO.update(to);

            return iss;
        } else {
            Sprint to = sprintDAO.getOne(params.toSprintId);

            Project toProject = to.getProject();
            boolean isToOwner = userDAO.isProductOwner(user.getId(), toProject.getId());
            if (!isToOwner)
                throw new InvalidParameterException("Invalid parameters!");

            Issue iss = issueDAO.getOne(params.issueId);
            iss.setSprint(to);
            iss = issueDAO.update(iss);
            iss.setOrderInBacklog(0);
            to.getIssues().add(iss);
            sprintDAO.update(to);
            return iss;
        }
    }

    @Override
    public Issue moveToBacklog(MoveToBacklog params, CustomUserDetails cusUser) throws InvalidParameterException {
        User user = cusUser.getUser();
        Issue iss = issueDAO.getOne(params.issueId);
        Project project = iss.getSprint().getProject();
        if (!userDAO.isProductOwner(user.getId(), project.getId()))
            throw new InvalidParameterException("Invalid parameters!");
        List<Issue> issues = issueDAO.findInBacklog(project.getBacklog().getId());
        Collections.sort(issues, (o1, o2) -> {
            return o1.getOrderInBacklog() - o2.getOrderInBacklog();
        });
        if (params.top) {
            if (issues.size() <= 0)
                iss.setOrderInBacklog(0);
            else
                iss.setOrderInBacklog(issues.get(0).getOrderInBacklog() - 1);
        }
        if (params.bottom) {
            if (issues.size() <= 0)
                iss.setOrderInBacklog(0);
            else
                iss.setOrderInBacklog(issues.get(issues.size() - 1).getOrderInBacklog() + 1);
        }
        iss.setSprint(null);
        return issueDAO.update(iss);
    }

    @Override
    public Issue updateDetail(UpdateDetailParams issueParams, UserDetails user) {
        Issue iss = issueDAO.getOne(issueParams.issueId);
        if(iss == null) return null;
        if (issueParams.description != null)
            iss.setDescription(issueParams.description);
        if (issueParams.storyPoint != null)
            iss.setStoryPoint(issueParams.storyPoint);

        if (issueParams.issueTypeId != null) {
            IssueType issueType = issueTypeRepository.getOne(issueParams.issueTypeId);
            iss.setIssueType(issueType);
        }

        if (issueParams.priority != null) {
            Priority priority = priorityRepository.getOne(issueParams.priority);
            iss.setPriority(priority);
        }

        User assignee= null;
        if(issueParams.assigneeEmail != null){
            assignee = userDAO.getUser(issueParams.assigneeEmail);
        }
        if(issueParams.workflowStatus != null && issueParams.workflowStatus > 0){
            WorkFlowItem status = workFlowItemRepository.getOne(issueParams.workflowStatus);
            iss.setStatus(status);
        }
        iss.setAssignment(assignee);
        return issueDAO.update(iss);
    }

    @Override
    public Issue dragAndDrop(DragAndDrop params, CustomUserDetails userDetails) {
        // just product owner and it's issue assignee can change
        boolean checkPermission = true;
        if (!checkPermission) throw new InvalidParameterException("Invalid parameters!");
        Issue iss = issueDAO.getOne(params.id);
        WorkFlowItem newStatus = workFlowItemRepository.getOne(params.toStatusId);
        iss.setStatus(newStatus);
        if (params.toAssignee != null) {
            User user = userDAO.getUserByUserName(params.toAssignee);
            iss.setAssignment(user);
        } else {
            iss.setAssignment(null);
        }
        issueDAO.update(iss);
        return iss;
    }
    public Issue fetchIssue(Integer issueId) {
        return issueDAO.getOne(issueId);
    }

    @Override
    public List<Priority> fetchPriorityList() {
        return priorityRepository.findAll();
    }
}
