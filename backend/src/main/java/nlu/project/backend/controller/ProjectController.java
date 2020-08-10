package nlu.project.backend.controller;

import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.entry.filter.ProjectFilterParams;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.entry.project.UserRoleParams;
import nlu.project.backend.entry.project.WorkFlowParams;
import nlu.project.backend.model.IssueType;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/project")
@Secured("ROLE_USER")
public class ProjectController extends BaseController{

    @Autowired
    ProjectBusiness projectBusiness;

    @PostMapping("/create")
    public ApiResponse createProject(ProjectParams projectParams, HttpServletRequest request) {
        if (projectParams.productOwner == null) {
            CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
            projectParams.productOwner = userDetails.getUser().getId();
        }
        if (projectParams.leader == null) {
            projectParams.leader = projectParams.productOwner;
        }
        Object result = projectBusiness.create(projectParams);
        return ApiResponse.OnCreatedSuccess(result, "Create Project Success!");
    }

    @PostMapping("/update")
    public ApiResponse updateProject(@RequestBody ProjectParams projectParams) {
        Object result = projectBusiness.update(projectParams);
        return ApiResponse.OnSuccess(result, "Update Project Success!");
    }

    @PostMapping("/delete")
    public ApiResponse deleteProject(@RequestBody ProjectParams projectParams, HttpServletRequest request) {
        Object result = projectBusiness.delete(projectParams, getUser(request));
        if (result.equals(Boolean.FALSE)) {
            return ApiResponse.OnBadRequest("Delete Project Failed");
        }
        return ApiResponse.OnCreatedSuccess(result, "Delete Project Success!");
    }

    @PostMapping("/searchByName")
    public ApiResponse searchProjectByName(@RequestBody ProjectFilterParams projectFilterParams) {
        Object result = projectBusiness.findByName(projectFilterParams.name);
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @PostMapping("/searchByUserId")
    public ApiResponse searchProjectByUserId(@RequestBody ProjectFilterParams projectFilterParams) {
        Object result = projectBusiness.findByUserId(projectFilterParams.userId);
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @GetMapping("/jointIn")
    public ApiResponse jointIn(HttpServletRequest request) {
        CustomUserDetails user = (CustomUserDetails) getUser(request);
        Object result = projectBusiness.findJointIn(user.getUser().getId());
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @PostMapping("/searchByOwnerId")
    public ApiResponse searchProjectByOwnerId(@RequestBody ProjectFilterParams projectFilterParams) {
        Object result = projectBusiness.findByOwner(projectFilterParams.ownerId);
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @PostMapping("/searchByKey")
    public ApiResponse searchProjectByKey(@RequestBody ProjectFilterParams projectFilterParams) {
        Object result = projectBusiness.findByKey(projectFilterParams.key);
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @PostMapping("/searchByFilter")
    public ApiResponse searchProjectByFilter(@RequestBody ProjectFilterParams projectFilterParams) {
        Object result = projectBusiness.findByFilter(projectFilterParams);
        return ApiResponse.OnSuccess(result, "Find Project Success!");
    }

    @GetMapping("/all-workflow/{projectId}")
    public ApiResponse getWorkFlow(@PathVariable Integer projectId) {
        Object result = projectBusiness.getWorkFlow(projectId);
        return ApiResponse.OnSuccess(result, "Fetch WorkFlow Success!");
    }

    @GetMapping("/{projectId}/workflow")
    public ApiResponse getCurrentWorkFlow(@PathVariable Integer projectId) {
        Object result = projectBusiness.getCurrentWorkFlow(projectId);
        return ApiResponse.OnSuccess(result, "Fetch WorkFlow Success!");
    }

    @PostMapping("/workflow/create")
    public ApiResponse createWorkflow(@RequestBody WorkFlowParams params) {
        Object result = projectBusiness.createWorkFlow(params);
        return ApiResponse.OnSuccess(result, "Create WorkFlow Success!");
    }

    @PostMapping("/workflow/add-item")
    public ApiResponse addWorkFlowItem(@RequestBody WorkFlowParams params) {
        Object result = projectBusiness.addWorkFlowItem(params);
        return ApiResponse.OnSuccess(result, "Add WorkFlow Item Success!");
    }

    @PostMapping("/workflow/delete-item")
    public ApiResponse deleteWorkFlowItem(@RequestBody WorkFlowParams params) {
        Object result = projectBusiness.deleteWorkFlowItem(params);
        return ApiResponse.OnSuccess(result, "Delete WorkFlow Item Success!");
    }

    @PostMapping("/workflow/add-link")
    public ApiResponse addLinkWorkFlow(@RequestBody WorkFlowParams params) {
        Object result = projectBusiness.addLinkWorkFlow(params);
        return ApiResponse.OnSuccess(result, "Add Link WorkFlow Item Success!");
    }

    @PostMapping("/workflow/delete-link")
    public ApiResponse deleteLinkWorkFlow(@RequestBody WorkFlowParams params) {
        Object result = projectBusiness.deleteLinkWorkFlow(params);
        return ApiResponse.OnSuccess(result, "Delete Link WorkFlow Item Success!");
    }

    @PostMapping("/member/add")
    public ApiResponse addMember(@RequestBody UserRoleParams params) {
        Object result = projectBusiness.addMember(params);
        return ApiResponse.OnSuccess(result, "Add member success!");
    }

    @PostMapping("/member/remove")
    public ApiResponse removeMember(@RequestBody UserRoleParams params) {
        projectBusiness.removeMember(params);
        return ApiResponse.OnSuccess(null, "Remove member success!");
    }

    @PostMapping("/member/addRole")
    public ApiResponse addRoleToMember(@RequestBody UserRoleParams params) {
        Object result = projectBusiness.addRoleToMember(params);
        return ApiResponse.OnSuccess(result, "Add role to member success!");
    }

    @PostMapping("/member/removeRole")
    public ApiResponse removeRoleFromMember(@RequestBody UserRoleParams params) {
        projectBusiness.removeRoleFromMember(params);
        return ApiResponse.OnSuccess(null, "Remove role to member success!");
    }

    @GetMapping("/{projectId}/issuetypes")
    public ApiResponse getIssueTypes(HttpServletRequest request, @PathVariable("projectId") Integer projectId){
        CustomUserDetails user = (CustomUserDetails) getUser(request);
        List<IssueType> issueTypes = projectBusiness.getIssueTypes(projectId, user.getUser().getId());
        return ApiResponse.OnSuccess(issueTypes , "Request success!");

    }

    @GetMapping("/{projectId}/backlog")
    public ApiResponse backlog(HttpServletRequest request, @PathVariable("projectId") Integer projectId){
        CustomUserDetails user = (CustomUserDetails) getUser(request);
        Object result = projectBusiness.getBacklogItems(projectId, user);
        return ApiResponse.OnSuccess(result , "Request backlog success!");
    }
    @GetMapping("/{projectId}/workingSprints")
    public ApiResponse workingSprints(HttpServletRequest request, @PathVariable("projectId") Integer projectId){
        CustomUserDetails user = (CustomUserDetails) getUser(request);
        Object result = projectBusiness.getWorkingSprints(projectId, user);
        return ApiResponse.OnSuccess(result , "Request sprints success!");
    }

    @GetMapping("/{projectId}/devteam")
    public ApiResponse getDevTeam(HttpServletRequest request, @PathVariable("projectId") Integer projectId){
        CustomUserDetails user = (CustomUserDetails) getUser(request);
        Object result = projectBusiness.getDevTeam(projectId, user);
        return ApiResponse.OnSuccess(result , "Get dev team success!");
    }

    @GetMapping("/{projectId}")
    public ApiResponse getProject(HttpServletRequest request, @PathVariable("projectId") Integer projectId){
        CustomUserDetails user = (CustomUserDetails) getUser(request);
        Object result = projectBusiness.getProject(projectId, user);
        return ApiResponse.OnSuccess(result , "Get project success!");
    }
}
