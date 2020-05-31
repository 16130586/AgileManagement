package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "sprint")
@Data
@Builder
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "sprint")
    private List<Issue> issues;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_begin")
    private Date dateBegin;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_end")
    private Date dateEnd;
}
