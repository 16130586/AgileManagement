package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "workflow_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkFlowItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "_order")
    private Integer order;
    @Column(name = "color")
    private String color;
    @Column(name = "location")
    private String location;
    @ManyToOne
    @JoinColumn(name = "workflow_id")
    @JsonIgnoreProperties("items")
    private WorkFlow workFlow;
    @ManyToMany
    @JoinTable(name = "link_workflow",
            joinColumns = @JoinColumn(name = "workflow_from"),
            inverseJoinColumns = @JoinColumn(name = "workflow_to"))
    @JsonIgnoreProperties("nextItems")
    private List<WorkFlowItem> nextItems;
    @Column(name = "is_start", columnDefinition = "boolean default false")
    private boolean isStart;
    @Column(name = "is_end", columnDefinition = "boolean default false")
    private boolean isEnd;
}
