package nlu.project.backend.controller;

import nlu.project.backend.business.GroupBusiness;
import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.model.Group;
import nlu.project.backend.model.UserGroup;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/group")
@Secured("ROLE_USER")
public class GroupController extends BaseController {

    @Autowired
    GroupBusiness groupBusiness;

    @GetMapping
    public ApiResponse getAllGroup(HttpServletRequest request) {
        CustomUserDetails user = (CustomUserDetails) getUser(request);
        Object result = groupBusiness.getGroupsByUser(user.getUser());
        return ApiResponse.OnSuccess(result, "Fetch groups success!");
    }

    @PostMapping("/create")
    public ApiResponse create(HttpServletRequest request, @RequestBody GroupParams groupParams) {
        CustomUserDetails userDetails = (CustomUserDetails) getUser(request);
        Group group = groupBusiness.createGroup(groupParams, userDetails.getUser());
        return ApiResponse.OnSuccess(group, "Create group success!");
    }

    @PostMapping("/add")
    public ApiResponse addUser(@RequestBody GroupParams groupParams) {
        UserGroup userGroup = groupBusiness.addUser(groupParams);
        return ApiResponse.OnSuccess(userGroup, "Add user to group success!");
    }

    @PostMapping("/remove")
    public ApiResponse removeUser(@RequestBody GroupParams groupParams) {
        Object result = groupBusiness.removeUser(groupParams);
        return ApiResponse.OnSuccess(result, "Remove user from group success!");
    }
}
