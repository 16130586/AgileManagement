package nlu.project.backend.business;

import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.model.Issue;

public interface IssueBusiness {
    Issue create(IssueParams issueParams);
    Issue update(IssueParams issueParams);
    Issue delete(IssueParams issueParams);
}
