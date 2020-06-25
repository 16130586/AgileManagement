package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectBusinessImpl implements ProjectBusiness {
    @Autowired
    ProjectDAO projectDAO;

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
    public boolean delete() {
        return false;
    }
}
