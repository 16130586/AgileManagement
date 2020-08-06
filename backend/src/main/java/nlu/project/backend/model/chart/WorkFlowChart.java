package nlu.project.backend.model.chart;

import lombok.Data;

import java.util.List;

@Data
public class WorkFlowChart {
    public Integer id;
    public String name;
    public List<NodeData> nodeDataArray;
    public List<LinkData> linkDataArray;
}
