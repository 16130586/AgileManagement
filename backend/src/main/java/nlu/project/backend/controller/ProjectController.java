package nlu.project.backend.controller;

import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.model.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    ProjectBusiness projectBusiness;

    @PostMapping("/create")
    public ApiResponse createProject(@RequestBody ProjectParams projectParams, HttpServletRequest request) {
        Object result = projectBusiness.create(projectParams, (UserDetails) request.getAttribute("user"));
        return ApiResponse.OnCreatedSuccess(result, "Create Project Success!");
    }

    @PostMapping("/update")
    public ApiResponse updateProject(@RequestBody ProjectParams projectParams) {
        Object result = projectBusiness.update(projectParams);
        return ApiResponse.OnSuccess(result, "Update Project Success!");
    }
}
