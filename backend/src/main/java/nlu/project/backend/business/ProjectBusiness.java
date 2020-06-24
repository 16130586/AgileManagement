package nlu.project.backend.business;

import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.model.Project;

public interface ProjectBusiness {
    Project create(ProjectParams projectParams);
    Project update(ProjectParams projectParams);
    boolean delete();
}
