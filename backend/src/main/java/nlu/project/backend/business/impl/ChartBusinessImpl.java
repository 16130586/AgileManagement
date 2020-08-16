package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.business.ChartBusiness;
import nlu.project.backend.entry.project.WorkFlowParams;
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
public class ChartBusinessImpl implements ChartBusiness {
    @Autowired
    ProjectDAO projectDAO;

    @Override
    public List<WorkFlowChart> getWorkFlowChart(int projectId) {
        List<WorkFlow> workFlows = projectDAO.getWorkFlowByProjectId(projectId);
        return parseWorkFlowToChartData(workFlows);
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
            workFlowChart.setProjectId(workflow.getProject() != null ? workflow.getProject().getId() : null);
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

    @Override
    public void updateWorkFlow(WorkFlowChart chart) {
        WorkFlow workFlow = projectDAO.getWorkFlowById(chart.id);

        // update Workflow-Item
        updateWorkFlowItem(workFlow.getItems(), chart.getNodeDataArray(), workFlow.getId());

        // remove Link-Workflow - this behavior just remove link, not add
        updateRemoveWorkFlowLink(workFlow.getItems(), chart.linkDataArray);
        projectDAO.updateWorkFlow(workFlow);
    }

    private void updateWorkFlowItem(List<WorkFlowItem> items, List<NodeData> nodeDataArray, int workflowId) {
        NodeData nodeData;
        WorkFlowParams params;
        for (WorkFlowItem item : items) {
            nodeData = getNodeDataById(item.getId(), nodeDataArray);
            if ( nodeData != null) {
                item.setName(nodeData.text);
                item.setLocation(nodeData.loc);
                item.setColor(nodeData.color);
            } else {
                params = new WorkFlowParams();
                params.toItemId = item.getId();
                projectDAO.deleteWorkFlowItem(params);
            }
        }
    }

    private void updateRemoveWorkFlowLink(List<WorkFlowItem> items, List<LinkData> linkDataArray) {
        List<WorkFlowItem> removedList = new ArrayList<>();
        for (WorkFlowItem item : items) {
            List<WorkFlowItem> nextItems = item.getNextItems();
            for (WorkFlowItem next : nextItems) {
                if (!isExistedLinkData(next, linkDataArray, item.getId())) {
                    removedList.add(next);
                }
            }
            nextItems.removeAll(removedList);
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

    private NodeData getNodeDataById(int id, List<NodeData> nodeDataArray) {
        for (NodeData node : nodeDataArray) {
            if (node.key == id)
                return node;
        }
        return null;
    }
}
