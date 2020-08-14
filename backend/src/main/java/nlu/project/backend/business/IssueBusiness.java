package nlu.project.backend.business;

import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.*;
import nlu.project.backend.model.Issue;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.SubTaskParams;
import nlu.project.backend.model.SubTask;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.entry.issue.MoveToBacklog;
import nlu.project.backend.entry.issue.MoveToParams;
import nlu.project.backend.model.IssueType;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.InvalidParameterException;
import java.util.List;

public interface IssueBusiness {
    Issue create(IssueParams issueParams, UserDetails userDetails);
    Issue update(IssueParams issueParams, UserDetails userDetails) throws InvalidParameterException;
    boolean delete(IssueParams issueParams, UserDetails userDetails) throws InvalidParameterException;
    List<Issue> findByFilter(IssueFilterParams filter);

    SubTask createSubTask(SubTaskParams params);
    SubTask updateSubTask(SubTaskParams params);
    void deleteSubTask(SubTaskParams params);
    List<SubTask> getSubTaskByIssueID(SubTaskParams params);

    IssueType createIssueType(IssueTypeParams issueTypeParams) throws InvalidParameterException;

    List<Issue> findInBacklog(Integer backlogId);

    Issue moveIssueToSprint(MoveToParams params, CustomUserDetails cusUser) throws InvalidParameterException;

    Issue moveToBacklog(MoveToBacklog params , CustomUserDetails cusUser) throws InvalidParameterException;

    Issue updateDetail(UpdateDetailParams issueParams, UserDetails user);

    Issue dragAndDrop(DragAndDrop params, CustomUserDetails userDetails);
}
