package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "sprint")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties({"leader" , "owner" , "devTeam" , "currentWorkFlow", "group"})
    private Project project;
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "sprint")
    private List<Issue> issues;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_begin")
    private Date dateBegin;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "plan_date_end")
    private Date planDateEnd;

    @Column(name = "actual_date_end")
    private Date dateEnd;

    // -1 delete , 0 not started , 1 started , 2 ended
    @Column(name= "status")
    private Integer status;

    @Column(name="_order")
    private Integer order;

    @Column(name="goal")
    private String goal;
}
