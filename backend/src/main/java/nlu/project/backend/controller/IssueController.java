package nlu.project.backend.controller;

import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.filter.ProjectFilterParams;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.SubTaskParams;
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
            return ApiResponse.OnBadRequest("Delete Issue Failed");
        }
        return ApiResponse.OnCreatedSuccess(result, "Delete Issue Success!");
    }

    @PostMapping("/searchByFilter")
    public ApiResponse searchIssueByFilter(@RequestBody IssueFilterParams filterParams) {
        Object result = issueBusiness.findByFilter(filterParams);
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @PostMapping("/subTask/create")
    public ApiResponse createSubTask(@RequestBody SubTaskParams params) {
        Object result = issueBusiness.createSubTask(params);
        return ApiResponse.OnSuccess(result, "Create SubTask Success!");
    }

    @PostMapping("/subTask/update")
    public ApiResponse updateSubTask(@RequestBody SubTaskParams params) {
        Object result = issueBusiness.updateSubTask(params);
        return ApiResponse.OnSuccess(result, "Update SubTask Success!");
    }

    @PostMapping("/subTask/delete")
    public ApiResponse deleteSubTask(@RequestBody SubTaskParams params) {
        issueBusiness.deleteSubTask(params);
        return ApiResponse.OnSuccess(null, "Delete SubTask Success!");
    }

    @PostMapping("/subTask/getByIssue")
    public ApiResponse getSubTaskByIssueID(@RequestBody SubTaskParams params) {
        Object result = issueBusiness.getSubTaskByIssueID(params);
        return ApiResponse.OnSuccess(result, "Get SubTask Success!");
    }

}
