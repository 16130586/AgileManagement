package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.IssueDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.IssueType;
import nlu.project.backend.model.User;
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
        return issueDAO.update(issueParams);
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
}
