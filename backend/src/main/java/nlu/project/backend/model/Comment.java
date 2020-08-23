package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
    @ManyToOne
    @JoinColumn(name = "issue_id")
    @JsonIgnore
    private Issue issue;
    @ManyToOne
    @JoinColumn(name = "subtask_id")
    @JsonIgnore
    private SubTask subTask;
    @Column(name = "content")
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date date;
}
