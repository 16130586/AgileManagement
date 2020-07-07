package nlu.project.backend.repository;

import nlu.project.backend.model.LogTransaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogTransactionRepository extends CrudRepository<LogTransaction, Integer> {
}
