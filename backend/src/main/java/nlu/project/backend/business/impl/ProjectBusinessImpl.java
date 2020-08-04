package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.entry.filter.ProjectFilterParams;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.entry.project.UserRoleParams;
import nlu.project.backend.entry.project.WorkFlowParams;
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
    public List<Project> findByName(String name) {
        return projectDAO.findByNameLike(name);
    }

    @Override
    public List<Project> findByKey(String key) {
        return projectDAO.findByKeyLike(key);
    }

    @Override
    public List<Project> findByUserId(int userId) {
        return projectDAO.findByUser(userId);
    }

    @Override
    public List<Project> findByOwner(int ownerId) {
        return projectDAO.findByOwner(ownerId);
    }

    @Override
    public List<Project> findByFilter(ProjectFilterParams filter) {
        return projectDAO.findByFilter(filter);
    }

    @Override
    public List<Project> findJointIn(int userId) {
        return projectDAO.findJointIn(userId);
    }

    @Override
    public WorkFlow createWorkFlow(WorkFlowParams params) {
        return projectDAO.createWorkFlow(params);
    }

    @Override
    public WorkFlowItem addWorkFlowItem(WorkFlowParams params) {
        return projectDAO.addWorkFlowItem(params);
    }

    @Override
    public WorkFlowItem addLinkWorkFlow(WorkFlowParams params) {
        return projectDAO.addLinkWorkFlow(params);
    }

    @Override
    public WorkFlowItem deleteLinkWorkFlow(WorkFlowParams params) {
        return projectDAO.deleteLinkWorkFlow(params);
    }

    @Override
    public WorkFlow deleteWorkFlowItem(WorkFlowParams params) {
        return projectDAO.deleteWorkFlowItem(params);
    }

    @Override
    public UserRole addMember(UserRoleParams params) {
        return projectDAO.addMember(params);
    }

    @Override
    public void removeMember(UserRoleParams params) {
        projectDAO.removeMember(params);
    }

    @Override
    public UserRole addRoleToMember(UserRoleParams params) {
        return projectDAO.addRoleToMember(params);
    }

    @Override
    public void removeRoleFromMember(UserRoleParams params) {
        projectDAO.removeRoleFromMember(params);
    }

}
