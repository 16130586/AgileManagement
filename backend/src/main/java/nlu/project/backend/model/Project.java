package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "project")
@Data
@Builder
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
    @Column(name = "name")
    private String name;
    @Column(name = "code")
    private String code;
    @Column(name = "description")
    private String description;
}
