package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.*;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectBusinessImpl implements ProjectBusiness {
    @Autowired
    ProjectDAO projectDAO;

    @Autowired
    UserDAO userDAO;

    @Override
    public Project create(ProjectParams projectParams) {
        if (projectDAO.isExistedProjectName(projectParams.name))
            throw new InvalidInputException("Project's Name already exists");
        if (projectDAO.isExistedProjectCode(projectParams.key))
            throw new InvalidInputException("Project's Key already exists");
         return projectDAO.save(projectParams);
    }

    @Override
    public Project update(ProjectParams projectParams) {
        Project project = projectDAO.getProjectById(projectParams.id);
        // Check New Name != Old Name && Existed
        if (!projectParams.name.equals(project.getName()) && projectDAO.isExistedProjectName(projectParams.name))
            throw new InvalidInputException("Project's Name already exists");
        // Check New Code != Old Code && Existed
        if (!projectParams.key.equals(project.getCode()) && projectDAO.isExistedProjectCode(projectParams.key))
            throw new InvalidInputException("Project's Key already exists");

        return projectDAO.update(project, projectParams);
    }

    @Override
    public boolean delete(ProjectParams projectParams, UserDetails userDetails) {
        User user = ((CustomUserDetails)userDetails).getUser();

        if (userDAO.isProductOwnerWithProjectId(user.getId(), projectParams.id)) {
            return projectDAO.delete(projectParams.id);
        }
        return false;
    }

    @Override
    public List<Project> findbyName(String name) {
        return projectDAO.findbyName(name);
    }

    @Override
    public List<Project> findbyKey(String key) {
        return projectDAO.findbyKey(key);
    }

    @Override
    public List<Project> findbyDescription(String description) {
        return projectDAO.findbyDescription(description);
    }


}
