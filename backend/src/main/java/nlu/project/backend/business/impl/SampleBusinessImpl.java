package nlu.project.backend.business.impl;

import lombok.NoArgsConstructor;
import nlu.project.backend.business.SampleBusiness;
import nlu.project.backend.exception.custom.NotFoundException;
import nlu.project.backend.model.LogTransaction;
import nlu.project.backend.repository.LogTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class SampleBusinessImpl implements SampleBusiness {
    @Autowired
    LogTransactionRepository logTransactionRepository;

    @Override
    public void getException() {
        throw new NotFoundException("Not Found");
    }

    @Override
    public void saveEntityDemo() {
        LogTransaction transaction = new LogTransaction();
        transaction.setName("Demo JPA");
        logTransactionRepository.save(transaction);
    }


}
