package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.IssueDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.User;
import nlu.project.backend.model.security.CustomUserDetails;
import org.graalvm.compiler.lir.LIRInstruction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class IssueBusinessImp implements IssueBusiness {

    @Autowired
    IssueDAO issueDAO;

    @Autowired
    UserDAO userDAO;

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
}
