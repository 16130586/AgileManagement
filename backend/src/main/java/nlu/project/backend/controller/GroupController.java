package nlu.project.backend.controller;

import nlu.project.backend.business.GroupBusiness;
import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.model.Group;
import nlu.project.backend.model.UserGroup;
import nlu.project.backend.model.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/group")
@Secured("ROLE_USER")
public class GroupController {

    @Autowired
    GroupBusiness groupBusiness;

    @PostMapping("/create")
    public ApiResponse create(@RequestBody GroupParams groupParams) {
        Group group = groupBusiness.createGroup(groupParams);
        return ApiResponse.OnSuccess(group, "Create group success!");
    }

    @PostMapping("/add")
    public ApiResponse addUser(@RequestBody GroupParams groupParams) {
        UserGroup userGroup = groupBusiness.addUser(groupParams);
        return ApiResponse.OnSuccess(userGroup, "Add user to group success!");
    }

    @PostMapping("/remove")
    public ApiResponse removeUser(@RequestBody GroupParams groupParams) {
        groupBusiness.removeUser(groupParams);
        return ApiResponse.OnSuccess(null, "Remove user from group success!");
    }
}
