package nlu.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "_group")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "groups")
    @JsonIgnoreProperties("groups")
    private List<User> member = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnoreProperties("groups")
    private User owner;
}
