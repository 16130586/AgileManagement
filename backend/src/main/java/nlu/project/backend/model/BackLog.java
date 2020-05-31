package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "backlog")
@Data
@Builder
public class BackLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @OneToMany(mappedBy = "backLog")
    private List<Issue> issues;
    @Column(name = "description")
    private String description;
}
