package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "subtask")
@Data
@Builder
public class SubTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;
    @ManyToOne
    @JoinColumn(name = "assignment")
    private User assignment;
    @Column(name = "name")
    private String name;
    @Column(name = "estimate_time")
    private Double estimateTime;
}
