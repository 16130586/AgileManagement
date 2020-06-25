package nlu.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Sprint sprint;
    @ManyToOne
    @JoinColumn(name = "backlog_id")
    private BackLog backLog;
    @ManyToOne
    @JoinColumn(name = "assignment")
    private User assignment;
    @ManyToOne
    @JoinColumn(name = "workflow_id")
    private WorkFlow workFlow;
    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "hours")
    private Double hours;
    @ManyToOne
    @JoinColumn(name = "priority_id")
    private Priority priority;


}
