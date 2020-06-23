package nlu.project.backend.business;

import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.model.Project;
import org.springframework.security.core.userdetails.UserDetails;

public interface ProjectBusiness {
    Project create(ProjectParams projectParams, UserDetails userDetails);
    Project update(ProjectParams projectParams);
    boolean delete();
}
