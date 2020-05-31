package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "log_transaction")
@Data
@Builder
public class LogTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "type_id")
    private TransactionType type;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "name")
    private String name;
    @Column(name = "_from")
    private String from;
    @Column(name = "_to")
    private String to;
    @Column(name = "description")
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")
    private Date date;
}
