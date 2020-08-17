package nlu.project.backend.controller;

import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.entry.filter.IssueFilterParams;
import nlu.project.backend.entry.issue.*;
import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.SubTaskParams;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.entry.issue.MoveToBacklog;
import nlu.project.backend.entry.issue.MoveToParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/issue")
@Secured("ROLE_USER")
public class IssueController extends BaseController{

    @Autowired
    IssueBusiness issueBusiness;

    @GetMapping("/{issueId}")
    public ApiResponse fetchIssue(@PathVariable Integer issueId) {
        Object result = issueBusiness.fetchIssue(issueId);
        return ApiResponse.OnSuccess(result, "Fetch Issue Success!");
    }

    @PostMapping("/create")
    public ApiResponse createIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.create(issueParams, getUser(request));
        if (result == null) {
            return ApiResponse.OnBadRequest("Create Issue Failed");
        }
        return ApiResponse.OnCreatedSuccess(result, "Create Issue Success!");

    }

    @PostMapping("/patch")
    public ApiResponse updateIssue(@RequestBody IssueParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.update(issueParams, getUser(request));
        if (result == null) {
            return ApiResponse.OnBadRequest("Update Issue Failed");
        }
        return ApiResponse.OnCreatedSuccess(result, "Update Issue Success!");
    }

    @PostMapping("/updateDetail")
    public ApiResponse updateDetailIssue(@RequestBody UpdateDetailParams issueParams, HttpServletRequest request) {
        Object result = issueBusiness.updateDetail(issueParams, getUser(request));
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
        return ApiResponse.OnCreatedSuccess(issueParams, "Delete Issue Success!");
    }

    @PostMapping("/searchByFilter")
    public ApiResponse searchIssueByFilter(@RequestBody IssueFilterParams filterParams) {
        Object result = issueBusiness.findByFilter(filterParams);
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @GetMapping("/subTask/{subTaskId}")
    public ApiResponse getSubTask(@PathVariable int subTaskId) {
        Object result = issueBusiness.getSubTaskById(subTaskId);
        return ApiResponse.OnSuccess(result, "Fetch SubTask Success!");
    }

    @PostMapping("/subTask/create")
    public ApiResponse createSubTask(@RequestBody SubTaskParams params, HttpServletRequest request) {
        Object result = issueBusiness.createSubTask(params, ((CustomUserDetails) getUser(request)).getUser());
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

    @PostMapping("/types")
    public ApiResponse createIssueType(HttpServletRequest request , @RequestBody IssueTypeParams issueTypeParams){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        issueTypeParams.setCreateByUserId(userDetails.getUser().getId());
        Object result = issueBusiness.createIssueType(issueTypeParams);
        if(result == null)
            return ApiResponse.OnBadRequest("Cannot create new issue!");
        return ApiResponse.OnSuccess(result , "Created!");
    }

    @PostMapping("/move")
    public ApiResponse moveIssueToSprint(HttpServletRequest request ,
                                         @RequestBody MoveToParams params){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = issueBusiness.moveIssueToSprint(params , userDetails);
        if(result == null)
            return ApiResponse.OnBadRequest("Cannot move");
        return ApiResponse.OnSuccess(params , "move!");
    }
    @PostMapping("/{id}/topBacklog")
    public ApiResponse moveIssueToTopBacklog(HttpServletRequest request,
                                             @RequestBody MoveToBacklog params){
            params.top = true;
            params.bottom = false;
            CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
            Object result = issueBusiness.moveToBacklog(params , userDetails);
            if(result == null)
                return ApiResponse.OnBadRequest("Cannot move");
            return ApiResponse.OnSuccess(params , "move!");
    }
    @PostMapping("/{id}/bottomBacklog")
    public ApiResponse moveIssueToBottomBacklog(HttpServletRequest request,
                                             @RequestBody MoveToBacklog params){
        params.top = false;
        params.bottom = true;
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = issueBusiness.moveToBacklog(params , userDetails);
        if(result == null)
            return ApiResponse.OnBadRequest("Cannot move");
        return ApiResponse.OnSuccess(params , "move!");
    }
    @PostMapping("/dad")
    public ApiResponse dragAndDrop(HttpServletRequest request,
                                                @RequestBody DragAndDrop params) {

        if ("unassigned".equals(params.fromAssignee))
            params.fromAssignee = null;
        if ("unassigned".equals(params.toAssignee))
            params.toAssignee = null;
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Issue result = issueBusiness.dragAndDrop(params, userDetails);
        Map<String, Object> jsonObject = new HashMap<>();

        jsonObject.put("data", result);
        jsonObject.put("id", params.id);
        jsonObject.put("fromStatus", params.fromStatusId);
        jsonObject.put("toStatusId", params.toStatusId);
        jsonObject.put("fromAssignee", params.fromAssignee);
        jsonObject.put("toAssignee", params.toAssignee);
        if (result == null)
            return ApiResponse.OnBadRequest("Cannot done");
        return ApiResponse.OnSuccess(jsonObject, "done");
    }
    @GetMapping("/priority")
    public ApiResponse getPriority() {
        Object result = issueBusiness.fetchPriorityList();
        return ApiResponse.OnSuccess(result, "Fetch list priority success!");
    }

    @PostMapping("/subTask/logWork")
    public ApiResponse logWork(@RequestBody SubTaskParams params, HttpServletRequest request) {
        CustomUserDetails userDetails = (CustomUserDetails) getUser(request);
        Object result = issueBusiness.logWork(params, userDetails.getUser());
        return ApiResponse.OnSuccess(result, "Logged!");
    }
}
