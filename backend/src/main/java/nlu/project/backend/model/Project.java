package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "project")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
    @Column(name = "name")
    private String name;
    @Column(name = "code")
    private String code;
    @Column(name = "description")
    private String description;
    @Column(name="imgUrl")
    private String imgUrl;


    @JsonIgnore
    @JoinColumn(name="backlog_id" , nullable = true)
    @OneToOne
    private BackLog backlog;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="leader_id", nullable = true)
    private User leader;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="owner_id", nullable = true)
    private User owner;

    @ManyToMany(mappedBy = "jointProjects", fetch = FetchType.LAZY)
    private Collection<User> devTeam;

    @ManyToOne
    @JoinColumn(name = "workflow_id")
    private WorkFlow currentWorkFlow;

    @Column(name = "deleted" , columnDefinition = "boolean default false")
    private boolean deleted;
}
