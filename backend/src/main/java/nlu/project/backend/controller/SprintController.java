package nlu.project.backend.controller;

import nlu.project.backend.business.SprintBusiness;
import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.model.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/sprint")
@Secured("ROLE_USER")
public class SprintController {

    @Autowired
    SprintBusiness sprintBusiness;

    @PostMapping("/searchByFilter")
    public ApiResponse searchSprintByFilter(@RequestBody SprintFilterParams filterParams) {
        Object result = sprintBusiness.findByFilter(filterParams);
        return ApiResponse.OnSuccess(result, "Find Sprint Success!");
    }
}
