package nlu.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "link_issue")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkIssue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "url")
    private String url;
    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;
}
