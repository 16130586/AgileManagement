package nlu.project.backend.controller;

import nlu.project.backend.business.SprintBusiness;
import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.entry.sprint.CreateSprintParams;
import nlu.project.backend.entry.sprint.EditSprintParams;
import nlu.project.backend.entry.sprint.StartSprintParams;
import nlu.project.backend.model.Sprint;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/sprint")
@Secured("ROLE_USER")
public class SprintController extends  BaseController{

    @Autowired
    SprintBusiness sprintBusiness;

    @PostMapping("/searchByFilter")
    public ApiResponse searchSprintByFilter(@RequestBody SprintFilterParams filterParams) {
        Object result = sprintBusiness.findByFilter(filterParams);
        return ApiResponse.OnSuccess(result, "Find Sprint Success!");
    }

    @PostMapping()
    public ApiResponse createSprint(HttpServletRequest request ,  @RequestBody CreateSprintParams entry){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = sprintBusiness.create(entry , userDetails);
        return ApiResponse.OnSuccess(result, "Create sprint Success!");
    }

    @PostMapping("/{id}/end")
    public ApiResponse endSprint(HttpServletRequest request ,  @PathVariable("id") Integer sprintId){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = sprintBusiness.endSprint(sprintId , userDetails);
        return ApiResponse.OnSuccess(result, "End sprint Success!");
    }

    @PostMapping("/{id}/start")
    public ApiResponse startSprint(HttpServletRequest request , @RequestBody StartSprintParams entryParams){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = sprintBusiness.startSprint(entryParams , userDetails);
        return ApiResponse.OnSuccess(result, "Start sprint Success!");
    }
    @PostMapping("/{id}/moveUp")
    public ApiResponse moveUp(HttpServletRequest request , @PathVariable(value="id") Integer sprintId){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = sprintBusiness.moveUp(sprintId , userDetails);
        return ApiResponse.OnSuccess(result, "Move up down Success!");
    }
    @PostMapping("/{id}/moveDown")
    public ApiResponse moveDown(HttpServletRequest request , @PathVariable(value="id") Integer sprintId){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = sprintBusiness.moveDown(sprintId , userDetails);
        return ApiResponse.OnSuccess(result, "Move up sprint Success!");
    }
    @DeleteMapping("/{id}")
    public ApiResponse deleteSprint(HttpServletRequest request , @PathVariable(value="id") Integer sprintId){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = sprintBusiness.deleteSprint(sprintId , userDetails);
        return ApiResponse.OnSuccess(result, "delete sprint Success!");
    }
    @PutMapping("/{id}")
    public ApiResponse updateSprint(HttpServletRequest request , @RequestBody EditSprintParams entry){
        CustomUserDetails userDetails = (CustomUserDetails) getUser((request));
        Object result = sprintBusiness.updateSprint(entry , userDetails);
        return ApiResponse.OnSuccess(result, "delete sprint Success!");
    }
}
