package nlu.project.backend.controller;

import nlu.project.backend.business.ChartBusiness;
import nlu.project.backend.model.chart.WorkFlowChart;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@Secured("ROLE_USER")
@RequestMapping("/chart")
public class ChartController extends  BaseController {
    @Autowired
    ChartBusiness chartBusiness;

    @GetMapping("/workflow/{projectId}")
    public ApiResponse getWorkFlow(@PathVariable Integer projectId) {
        Object result = chartBusiness.getWorkFlowChart(projectId);
        return ApiResponse.OnSuccess(result, "Fetch WorkFlow Success!");
    }

    @PostMapping("/workflow")
    public ApiResponse updateWorkFlow(@RequestBody WorkFlowChart chart) {
        chartBusiness.updateWorkFlow(chart);
        return ApiResponse.OnSuccess(null, "Update WorkFlow Success!");
    }
    @GetMapping("/{projectId}/velocityData")
    public ApiResponse getVelocityData(HttpServletRequest request,  @PathVariable Integer projectId) {
        UserDetails user = getUser(request);
        Object result = chartBusiness.getVelocityData(user, projectId);
        return ApiResponse.OnSuccess(result, "Fetch WorkFlow Success!");
    }
}
