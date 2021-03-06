package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "backlog")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BackLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties({"owner","devTeam","currentWorkflow.items"})
    private Project project;
    @OneToMany(mappedBy = "backLog")
    private List<Issue> issues;
    @Column(name = "description")
    private String description;
}
