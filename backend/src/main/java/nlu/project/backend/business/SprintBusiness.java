package nlu.project.backend.business;

import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.model.Sprint;

import java.util.List;

public interface SprintBusiness {
    List<Sprint> findByFilter(SprintFilterParams filter);
}
