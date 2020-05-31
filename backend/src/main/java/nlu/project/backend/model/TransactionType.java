package nlu.project.backend.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "transaction_type")
@Data
public class TransactionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
}
