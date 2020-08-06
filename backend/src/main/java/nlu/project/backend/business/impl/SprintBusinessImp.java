package nlu.project.backend.business.impl;

import lombok.NoArgsConstructor;
import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.DAO.SprintDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.ProjectBusiness;
import nlu.project.backend.business.SprintBusiness;
import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.entry.sprint.CreateSprintParams;
import nlu.project.backend.entry.sprint.EditSprintParams;
import nlu.project.backend.entry.sprint.StartSprintParams;
import nlu.project.backend.model.Issue;
import nlu.project.backend.model.Project;
import nlu.project.backend.model.Sprint;
import nlu.project.backend.model.User;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
@NoArgsConstructor
public class SprintBusinessImp implements SprintBusiness {

    @Autowired
    SprintDAO sprintDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    ProjectDAO projectDAO;

    @Autowired
    ProjectBusiness productBusiness;

    @Override
    public List<Sprint> findByFilter(SprintFilterParams filter) {
        return sprintDAO.findByFilter(filter);
    }

    @Override
    public Sprint create(CreateSprintParams entry, CustomUserDetails userDetails) throws InvalidParameterException {
        User user = userDetails.getUser();
        if (!userDAO.isProductOwner(user.getId(), entry.projectId))
            throw new InvalidParameterException("Invalid parameters!");
        Project project = projectDAO.getProjectById(entry.projectId);
        String nextName = sprintDAO.getNextName(entry.projectId);
        if (nextName == null)
            throw new InternalError("Can not generate next project's sprint name, projectId[ " + entry.projectId + "]");
        List<Sprint> workingSprints = sprintDAO.findWorkingSprints(entry.projectId);
        Sprint adding = new Sprint();
        adding.setProject(project);
        adding.setName(nextName);
        adding.setStatus(0);
        if (workingSprints.size() > 0)
            adding.setOrder(workingSprints.get(workingSprints.size() - 1).getOrder() + 1);
        else
            adding.setOrder(0);
        Sprint result = sprintDAO.add(adding);
        if (result == null)
            throw new InternalError("Can not save next sprint name, name[ " + nextName + "]");
        return result;
    }

    @Override
    public Sprint endSprint(Integer sprintId, CustomUserDetails userDetails) throws InvalidParameterException {
        User user = userDetails.getUser();
        Sprint sprint = sprintDAO.getOne(sprintId);
        if (!userDAO.isProductOwner(user.getId(), sprint.getProject().getId()))
            throw new InvalidParameterException("Invalid parameters!");
        sprint.setDateEnd(new Date(System.currentTimeMillis()));
        sprint.setStatus(2);
        sprintDAO.update(sprint);
        return sprint;
    }

    @Override
    public Sprint startSprint(StartSprintParams entry, CustomUserDetails userDetails) throws InvalidParameterException {
        User user = userDetails.getUser();
        Sprint sprint = sprintDAO.getOne(entry.sprintId);
        if (!userDAO.isProductOwner(user.getId(), sprint.getProject().getId()))
            throw new InvalidParameterException("Invalid parameters!");
        sprint.setDateBegin(entry.planDateStart);
        sprint.setPlanDateEnd(entry.planDateEnd);
        sprint.setStatus(1);
        sprintDAO.update(sprint);
        return sprint;
    }

    @Override
    public List<Sprint> moveUp(Integer sprintId, CustomUserDetails user) throws InvalidParameterException {
        Sprint requestedSprint = sprintDAO.getOne(sprintId);
        Project ownerProject = requestedSprint.getProject();

        List<Sprint> sprints = sprintDAO.findWorkingSprints(ownerProject.getId());
        int idoSprint = sprints.indexOf(requestedSprint);
        if(idoSprint < 0) throw new InternalError("Cannot find index of sprint: " + sprintId);
        if(idoSprint == 0){
            return sprints;
        }
        int previousOrder = requestedSprint.getOrder();
        requestedSprint.setOrder(sprints.get(idoSprint - 1).getOrder());
        sprints.get(idoSprint-1).setOrder(previousOrder);
        sprintDAO.update(requestedSprint);
        sprintDAO.update(sprints.get(idoSprint - 1));
        return sprints;
    }

    @Override
    public List<Sprint> moveDown(Integer sprintId, CustomUserDetails user) throws InvalidParameterException {
        Sprint requestedSprint = sprintDAO.getOne(sprintId);
        Project ownerProject = requestedSprint.getProject();

        List<Sprint> sprints = sprintDAO.findWorkingSprints(ownerProject.getId());
        int idoSprint = sprints.indexOf(requestedSprint);
        if(idoSprint < 0) throw new InternalError("Cannot find index of sprint: " + sprintId);
        if(idoSprint == (sprints.size() - 1)){
            return sprints;
        }
        int previousOrder = requestedSprint.getOrder();
        requestedSprint.setOrder(sprints.get(idoSprint + 1).getOrder());
        sprints.get(idoSprint+ 1).setOrder(previousOrder);
        sprintDAO.update(requestedSprint);
        sprintDAO.update(sprints.get(idoSprint + 1));
        return sprints;
    }

    @Override
    public Sprint deleteSprint(Integer sprintId, CustomUserDetails cusUser) throws InvalidParameterException {
        User user = cusUser.getUser();
        Sprint sprint = sprintDAO.getOne(sprintId);
        Project ownerProject = sprint.getProject();
        if (!userDAO.isProductOwner(user.getId(), ownerProject.getId()))
            throw new InvalidParameterException("Invalid parameters!");
        List<Sprint> sprints = sprintDAO.findWorkingSprints(ownerProject.getId());

        int idoSprint = sprints.indexOf(sprint);
        if (idoSprint >= 0 && idoSprint < (sprints.size() - 1)) {
            Sprint nextSprint = sprints.get(idoSprint + 1);
            List<Issue> issues = nextSprint.getIssues();
            if (issues != null) {
                sprint.getIssues().forEach(issue ->
                        issue.setSprint(nextSprint)
                );
                issues.addAll(sprint.getIssues());
            }
        } else if (idoSprint > 0) {
            sprint.getIssues().forEach(issue ->
                    issue.setSprint(null)
            );
        }
        sprint.setStatus(-1);
        sprintDAO.update(sprint);
        return sprint;
    }

    @Override
    public Sprint updateSprint(EditSprintParams entry, CustomUserDetails cusUser) throws InvalidParameterException {
        User user = cusUser.getUser();
        Sprint sprint = sprintDAO.getOne(entry.sprintId);
        if (!userDAO.isProductOwner(user.getId(), sprint.getProject().getId()))
            throw new InvalidParameterException("Invalid parameters!");
        sprint.setName(entry.name);
        sprint.setGoal(entry.goal);
        sprintDAO.update(sprint);
        return sprint;
    }

}
