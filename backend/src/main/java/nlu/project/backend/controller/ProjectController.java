package nlu.project.backend.controller;

import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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
}
