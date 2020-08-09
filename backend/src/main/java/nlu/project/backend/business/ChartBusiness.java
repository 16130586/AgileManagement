package nlu.project.backend.business;

import nlu.project.backend.model.WorkFlow;
import nlu.project.backend.model.chart.WorkFlowChart;

import java.util.List;

public interface ChartBusiness {
    List<WorkFlowChart> getWorkFlowChart(int projectId);
    void updateWorkFlow(WorkFlowChart chart);
}
