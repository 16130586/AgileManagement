package nlu.project.backend.business.impl;

import lombok.NoArgsConstructor;
import nlu.project.backend.DAO.SprintDAO;
import nlu.project.backend.business.SprintBusiness;
import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.model.Sprint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
public class SprintBusinessImp implements SprintBusiness {

    @Autowired
    SprintDAO sprintDAO;

    @Override
    public List<Sprint> findByFilter(SprintFilterParams filter) {
        return sprintDAO.findByFilter(filter);
    }
}
