package nlu.project.backend.business;

import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.entry.sprint.CreateSprintParams;
import nlu.project.backend.entry.sprint.EditSprintParams;
import nlu.project.backend.entry.sprint.IssueInSprintSearchParams;
import nlu.project.backend.entry.sprint.StartSprintParams;
import nlu.project.backend.model.Sprint;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.security.CustomUserDetails;

import java.security.InvalidParameterException;
import java.util.List;

public interface SprintBusiness {
    List<Sprint> findByFilter(SprintFilterParams filter);
    Sprint create(CreateSprintParams entry , CustomUserDetails user) throws InvalidParameterException;
    Sprint endSprint(Integer sprintId , CustomUserDetails user) throws InvalidParameterException;
    Sprint startSprint(StartSprintParams entry, CustomUserDetails user) throws InvalidParameterException;
    List<Sprint> moveUp(Integer sprintId, CustomUserDetails user) throws InvalidParameterException;
    List<Sprint> moveDown(Integer sprintId, CustomUserDetails user) throws InvalidParameterException;
    Sprint deleteSprint(Integer sprintId, CustomUserDetails user) throws  InvalidParameterException;
    Sprint updateSprint(EditSprintParams entry , CustomUserDetails user) throws InvalidParameterException;

    List<Issue> issueInSprintSearchParams(IssueInSprintSearchParams entry, CustomUserDetails userDetails);
}
