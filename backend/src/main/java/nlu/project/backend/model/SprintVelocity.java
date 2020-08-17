package nlu.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name = "velocity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SprintVelocity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "projectId")
    private int projectId;
    @Column(name = "sprintId")
    private int sprintId;
    @Column(name = "sprintName")
    private String sprintName;
    @Column(name = "totalStoryPoint")
    private int totalStoryPoint;
    @Column(name = "expectStoryPoint")
    private int totalExpectStoryPoint;
    @Column(name = "date")
    private Date date;
}
