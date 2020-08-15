package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "subtask")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "issue_id")
    @JsonIgnore
    private Issue issue;
    @ManyToOne
    @JoinColumn(name = "assignment")
    private User assignment;
    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "estimate_time")
    private Double estimateTime;
    @ManyToOne
    @JoinColumn(name = "workflow_item_id")
    @JsonIgnoreProperties("nextItems")
    private WorkFlowItem status;
    @OneToMany(mappedBy = "subTask")
    @JsonIgnoreProperties("subTask")
    private List<LogWork> logWorkList;
}
