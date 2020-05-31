package nlu.project.backend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "issue_type")
@Data
@Builder
public class IssueType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "icon_url")
    private String iconUrl;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
