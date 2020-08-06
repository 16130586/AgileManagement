package nlu.project.backend.controller;

import nlu.project.backend.business.ChartBusiness;
import nlu.project.backend.model.chart.WorkFlowChart;
import nlu.project.backend.model.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@Secured("ROLE_USER")
public class ChartController {
    @Autowired
    ChartBusiness chartBusiness;

    @GetMapping("/chart/workflow/{projectId}")
    public ApiResponse getWorkFlow(@PathVariable Integer projectId) {
        Object result = chartBusiness.getWorkFlowChart(projectId);
        return ApiResponse.OnSuccess(result, "Fetch WorkFlow Success!");
    }

    @PostMapping("/chart/workflow")
    public ApiResponse updateWorkFlow(@RequestBody WorkFlowChart chart) {
        chartBusiness.updateWorkFlow(chart);
        return ApiResponse.OnSuccess(null, "Update WorkFlow Success!");
    }
}
