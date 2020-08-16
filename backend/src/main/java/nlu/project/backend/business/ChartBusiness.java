package nlu.project.backend.business;

import nlu.project.backend.model.SprintVelocity;
import nlu.project.backend.model.WorkFlow;
import nlu.project.backend.model.chart.WorkFlowChart;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ChartBusiness {
    List<WorkFlowChart> getWorkFlowChart(int projectId);
    void updateWorkFlow(WorkFlowChart chart);
    List<SprintVelocity> getVelocityData(UserDetails user, Integer projectId);
}
