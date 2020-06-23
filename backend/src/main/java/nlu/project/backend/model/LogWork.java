package nlu.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "logwork")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
    @ManyToOne
    @JoinColumn(name = "subtask_id")
    private SubTask subTask;
    @Column(name = "hours")
    private Double hours;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")
    private Date date;
}
