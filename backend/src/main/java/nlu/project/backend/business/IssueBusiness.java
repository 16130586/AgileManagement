package nlu.project.backend.business;

import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.model.Issue;
import org.springframework.security.core.userdetails.UserDetails;

public interface IssueBusiness {
    Issue create(IssueParams issueParams, UserDetails userDetails);
    Issue update(IssueParams issueParams, UserDetails userDetails);
    boolean delete(IssueParams issueParams, UserDetails userDetails);
}
