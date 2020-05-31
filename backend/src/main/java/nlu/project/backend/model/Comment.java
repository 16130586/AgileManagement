package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comment")
@Data
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;
    @ManyToOne
    @JoinColumn(name = "subtask_id")
    private SubTask subTask;
    @Column(name = "content")
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")
    private Date date;
}
