package nlu.project.backend.repository;

import nlu.project.backend.model.LogTransaction;
import org.springframework.data.repository.CrudRepository;

public interface LogTransactionRepository extends CrudRepository<LogTransaction, Integer> {
}
