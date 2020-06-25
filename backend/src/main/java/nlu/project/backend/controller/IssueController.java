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
@Secured("ROLE_USER")
public class IssueController extends BaseController{

    @Autowired
    IssueBusiness issueBusiness;

    @PostMapping("/create")
    public ApiResponse createIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.create(issueParams, getUser(request));
        // if result khac null thi tao thanh cong
        // neu result khong tao duoc thi tra ve tao that bai
        // ApiResponse.BadRequesr()
        if (result == null) {
            return ApiResponse.OnBadRequest("Create Issue Failed");
        }
        return ApiResponse.OnCreatedSuccess(result, "Create Issue Success!");

    }

    @PostMapping("/update")
    public ApiResponse updateIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.update(issueParams, getUser(request));
        if (result == null) {
            return ApiResponse.OnBadRequest("Update Issue Failed");
        }
        return ApiResponse.OnCreatedSuccess(result, "Update Issue Success!");
    }


    @PostMapping("/delete")
    public ApiResponse deleteIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.delete(issueParams, getUser(request));
        if (result.equals(Boolean.FALSE)) {
            return ApiResponse.OnBadRequest("Update Issue Failed");
        }
        return ApiResponse.OnCreatedSuccess(result, "Delete Issue Success!");
    }
}
