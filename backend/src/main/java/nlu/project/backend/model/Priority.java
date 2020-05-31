package nlu.project.backend.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "priority")
@Data
public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "_order")
    private Integer order;
}
