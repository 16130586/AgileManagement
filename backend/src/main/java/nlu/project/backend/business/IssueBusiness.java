package nlu.project.backend.business;

import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.IssueType;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.InvalidParameterException;
import java.util.List;

public interface IssueBusiness {
    Issue create(IssueParams issueParams, UserDetails userDetails);
    Issue update(IssueParams issueParams, UserDetails userDetails);
    boolean delete(IssueParams issueParams, UserDetails userDetails);
    List<Issue> findByFilter(IssueFilterParams filter);

    IssueType createIssueType(IssueTypeParams issueTypeParams) throws InvalidParameterException;
}
