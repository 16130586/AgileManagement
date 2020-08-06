package nlu.project.backend.business.impl;

import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.DAO.SprintDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.business.IssueBusiness;
import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.business.SprintBusiness;
import nlu.project.backend.entry.filter.ProjectFilterParams;
import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.entry.project.WorkFlowParams;
import nlu.project.backend.exception.custom.InternalException;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.*;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;

@Service
public class ProjectBusinessImpl implements ProjectBusiness {
    @Autowired
    ProjectDAO projectDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    SprintDAO sprintDAO;

    @Autowired
    IssueBusiness issueBusiness;

    @Autowired
    FileBusiness fileBusiness;

    @Override
    public Project create(ProjectParams projectParams) {
        if (projectDAO.isExistedProjectName(projectParams.name))
            throw new InvalidInputException("Project's Name already exists");
        if (projectDAO.isExistedProjectCode(projectParams.key))
            throw new InvalidInputException("Project's Key already exists");
        String imgUrl = "";
        if (projectParams.file != null)
            imgUrl = fileBusiness.save(projectParams.file);
        // Project
         projectParams.setImgUrl(imgUrl);
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
    public void updateWorkFlowDiagram(List<WorkFlowParams> params) {
        projectDAO.updateWorkFlowDiagram(params);
    }

    @Override
    public List<IssueType> getIssueTypes(Integer projectId, Integer requestedUserId) {
        boolean isHasReadPermission = userDAO.isInProject(projectId , requestedUserId);
        if(isHasReadPermission){
            List<IssueType> result = projectDAO.getIssueTypes(projectId);
            if(result.size() <= 0)
                throw new InternalException("This project is missing default issue types");
            return result;
        }
        throw new InvalidParameterException("You cannot read this project's issue types");
    }

    @Override
    public List<Sprint> getWorkingSprints(Integer projectId, CustomUserDetails cusUser) {
        User user = cusUser.getUser();
        if (!userDAO.isProductOwner(user.getId(), projectId))
            throw new InvalidParameterException("Invalid parameters!");
        return sprintDAO.findWorkingSprints(projectId);
    }

    @Override
    public List<Issue> getBacklogItems(Integer projectId, CustomUserDetails user) {
        Project project = projectDAO.getProjectById(projectId);
        Integer backlogId = project.getBacklog().getId();
        return issueBusiness.findInBacklog(backlogId);
    }

    public boolean isInProject(Integer projectId , Integer userId){
        return userDAO.isInProject(projectId, userId);
    }

}
