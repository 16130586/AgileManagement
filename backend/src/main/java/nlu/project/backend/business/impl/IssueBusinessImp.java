package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.IssueDAO;
import nlu.project.backend.DAO.SprintDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.entry.issue.MoveToParams;
import nlu.project.backend.model.*;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;

@Service
public class IssueBusinessImp implements IssueBusiness {

    @Autowired
    IssueDAO issueDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    FileBusiness fileBusiness;

    @Autowired
    SprintDAO sprintDAO;


    @Override
    public Issue create(IssueParams issueParams, UserDetails userDetails) {
        User user = ((CustomUserDetails) userDetails).getUser();

        if (!userDAO.isProductOwner(user.getId(), issueParams.projectId))
            return issueDAO.save(issueParams);
        return null;
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
    }
}
