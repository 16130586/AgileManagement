package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "workflow")
@Data
@Builder
public class WorkFlow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "_order")
    private Integer order;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @ManyToMany
    @JoinTable(name = "link_workflow",
            joinColumns = @JoinColumn(name = "workflow_from"),
            inverseJoinColumns = @JoinColumn(name = "workflow_to"))
    private List<WorkFlow> nextWorkFlows;
    @ManyToMany
    @JoinTable(name = "link_workflow",
            joinColumns = @JoinColumn(name = "workflow_to"),
            inverseJoinColumns = @JoinColumn(name = "workflow_from"))
    private List<WorkFlow> preWorkFlows;
}
