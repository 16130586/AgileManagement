package nlu.project.backend.controller;

import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.model.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/issue")
public class IssueController {

    @Autowired
    IssueBusiness issueBusiness;

    @PostMapping("/create")
    @Secured("ROLE_USER")
    public ApiResponse createIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.create(issueParams);
        return ApiResponse.OnCreatedSuccess(result, "Create Issue Success!");
    }

    @PostMapping("/update")
    @Secured("ROLE_USER")
    public ApiResponse updateIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.update(issueParams);
        return ApiResponse.OnCreatedSuccess(result, "Update Issue Success!");
    }

    @PostMapping("/delete")
    @Secured("ROLE_USER")
    public ApiResponse deleteIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.delete(issueParams);
        return ApiResponse.OnCreatedSuccess(result, "Delete Issue Success!");
    }

}
