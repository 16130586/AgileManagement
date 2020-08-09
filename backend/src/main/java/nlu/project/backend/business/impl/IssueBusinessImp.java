package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.IssueDAO;
import nlu.project.backend.DAO.SubTaskDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.SubTaskParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.SubTask;
import nlu.project.backend.model.User;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueBusinessImp implements IssueBusiness {

    @Autowired
    IssueDAO issueDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    SubTaskDAO subTaskDAO;

    @Override
    public Issue create(IssueParams issueParams, UserDetails userDetails) {
        User user = ((CustomUserDetails)userDetails).getUser();

        if (userDAO.isProductOwner(user.getId(), issueParams.backlogId))
            return issueDAO.save(issueParams);
        return null;
    }

    @Override
    public Issue update(IssueParams issueParams, UserDetails userDetails) {
        User user = ((CustomUserDetails)userDetails).getUser();

        if (userDAO.isProductOwner(user.getId(), issueParams.backlogId))
            return issueDAO.update(issueParams);
        return null;
    }

    @Override
    public boolean delete(IssueParams issueParams, UserDetails userDetails) {
        User user = ((CustomUserDetails)userDetails).getUser();

        if (userDAO.isProductOwner(user.getId(), issueParams.backlogId))
            return issueDAO.delete(issueParams.id);
        return false;
    }

    @Override
    public List<Issue> findByFilter(IssueFilterParams filter) {
        return issueDAO.findByFilter(filter);
    }

    @Override
    public SubTask createSubTask(SubTaskParams params) {
        return subTaskDAO.create(params);
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
}
