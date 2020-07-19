package nlu.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "workflow")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkFlow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @OneToMany(mappedBy = "workFlow")
    private List<WorkFlowItem> items;

}
