package nlu.project.backend.business;

import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.entry.issue.MoveToBacklog;
import nlu.project.backend.entry.issue.MoveToParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.IssueType;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;
import java.security.InvalidParameterException;
import java.util.List;

public interface IssueBusiness {
    Issue create(IssueParams issueParams, UserDetails userDetails);
    Issue update(IssueParams issueParams, UserDetails userDetails) throws InvalidParameterException;
    boolean delete(IssueParams issueParams, UserDetails userDetails) throws InvalidParameterException;
    List<Issue> findByFilter(IssueFilterParams filter);

    IssueType createIssueType(IssueTypeParams issueTypeParams) throws InvalidParameterException;

    List<Issue> findInBacklog(Integer backlogId);

    Issue moveIssueToSprint(MoveToParams params, CustomUserDetails cusUser) throws InvalidParameterException;

    Issue moveToBacklog(MoveToBacklog params , CustomUserDetails cusUser) throws InvalidParameterException;
}
