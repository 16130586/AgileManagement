package nlu.project.backend.business;

import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.model.Project;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ProjectBusiness {
    Project create(ProjectParams projectParams);
    Project update(ProjectParams projectParams);
    boolean delete(ProjectParams projectParams, UserDetails userDetails);
    List<Project> findByName(String name);
    List<Project> findByKey(String name);
    List<Project> findByUserId(int userId);
    List<Project> findByOwner(int ownerId);
}
