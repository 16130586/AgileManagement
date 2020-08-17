package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "issue")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "issue_type_id")
    private IssueType issueType;
    @ManyToOne
    @JoinColumn(name = "sprint_id")
    @JsonIgnoreProperties("issues")
    private Sprint sprint;
    @ManyToOne
    @JoinColumn(name = "backlog_id")
    @JsonIgnoreProperties("issues")
    private BackLog backLog;
    @ManyToOne
    @JoinColumn(name = "assignment")
    private User assignment;
    @ManyToOne
    @JoinColumn(name = "workflow_item_id")
    @JsonIgnoreProperties("workflow")
    private WorkFlowItem status;
    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "hours")
    private Double hours;
    @OneToMany(mappedBy = "issue")
    private List<SubTask> subTasks;

    @Column(name = "story_point")
    private int storyPoint;
    @ManyToOne
    @JoinColumn(name = "priority_id")
    private Priority priority;

    @Column(name="order_in_backlog")
    private Integer orderInBacklog;

}
