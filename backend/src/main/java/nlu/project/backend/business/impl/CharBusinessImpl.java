package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.business.ChartBusiness;
import nlu.project.backend.model.WorkFlow;
import nlu.project.backend.model.WorkFlowItem;
import nlu.project.backend.model.chart.LinkData;
import nlu.project.backend.model.chart.NodeData;
import nlu.project.backend.model.chart.WorkFlowChart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CharBusinessImpl implements ChartBusiness {
    @Autowired
    ProjectDAO projectDAO;

    @Override
    public List<WorkFlowChart> getWorkFlowChart(int projectId) {
        List<WorkFlow> workFlows = projectDAO.getWorkFlowByProjectId(projectId);
        return parseWorkFlowToChartData(workFlows);
    }

    @Override
    public void updateWorkFlow(WorkFlowChart chart) {
        WorkFlow workFlow = projectDAO.getWorkFlowById(chart.id);

        // update Workflow-Item
        updateWorkFlowItem(workFlow.getItems(), chart.getNodeDataArray());

        // remove Link-Workflow - this behavior just remove link, not add
        updateRemoveWorkFlowLink(workFlow.getItems(), chart.linkDataArray);
        projectDAO.updateWorkFlow(workFlow);
    }

    private List<WorkFlowChart> parseWorkFlowToChartData(List<WorkFlow> workFlows) {
        List<WorkFlowChart> result = new ArrayList<>();
        List<NodeData> nodeDataArray;
        List<LinkData> linkDataArray;
        WorkFlowChart workFlowChart;
        for (WorkFlow workflow : workFlows) {
            workFlowChart = new WorkFlowChart();
            workFlowChart.setId(workflow.getId());
            workFlowChart.setName(workflow.getName());
            nodeDataArray = parseWorkFlowItemToNodeData(workflow.getItems());
            linkDataArray = parseWorkFlowItemToLinkData(workflow.getItems());
            workFlowChart.setNodeDataArray(nodeDataArray);
            workFlowChart.setLinkDataArray(linkDataArray);

            result.add(workFlowChart);
        }
        return result;
    }

    private List<NodeData> parseWorkFlowItemToNodeData(List<WorkFlowItem> items) {
        List<NodeData> result = new ArrayList<>();
        NodeData nodeData;
        for (WorkFlowItem item : items) {
            nodeData = new NodeData();
            nodeData.setKey(item.getId());
            nodeData.setColor(item.getColor());
            nodeData.setLoc(item.getLocation());
            nodeData.setText(item.getName());

            result.add(nodeData);
        }
        return result;
    }

    private List<LinkData> parseWorkFlowItemToLinkData(List<WorkFlowItem> items) {
        List<LinkData> result = new ArrayList<>();
        LinkData linkData;
        int i = 0;
        for (WorkFlowItem item : items) {
            for (WorkFlowItem next : item.getNextItems()) {
                linkData = new LinkData();
                linkData.setKey(--i);
                linkData.setFrom(item.getId());
                linkData.setTo(next.getId());

                result.add(linkData);
            }
        }
        return result;
    }

    private void updateWorkFlowItem(List<WorkFlowItem> items, List<NodeData> nodeDataArray) {
        for (int i = 0; i < items.size(); i++) {
            items.get(i).setName(nodeDataArray.get(i).text);
            items.get(i).setLocation(nodeDataArray.get(i).loc);
            items.get(i).setColor(nodeDataArray.get(i).color);
        }
    }

    private void updateRemoveWorkFlowLink(List<WorkFlowItem> items, List<LinkData> linkDataArray) {
        for (WorkFlowItem item : items) {
            List<WorkFlowItem> nextItems = item.getNextItems();
            for (WorkFlowItem next : nextItems) {
                if (!isExistedLinkData(next, linkDataArray, item.getId())) {
                    items.remove(next);
                }
            }
        }
    }

    private boolean isExistedLinkData(WorkFlowItem item, List<LinkData> linkDataArray, int fromId) {
        for (LinkData data : linkDataArray) {
            if (data.from == fromId) {
                if (data.to == item.getId())
                    return true;
            }
        }
        return false;
    }
}
