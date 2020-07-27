package nlu.project.backend.business;

import nlu.project.backend.entry.filter.ProjectFilterParams;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.entry.project.WorkFlowParams;
import nlu.project.backend.model.IssueType;
import nlu.project.backend.model.Project;
import nlu.project.backend.model.WorkFlow;
import nlu.project.backend.model.WorkFlowItem;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ProjectBusiness {
    Project create(ProjectParams projectParams);
    Project update(ProjectParams projectParams);
    boolean delete(ProjectParams projectParams, UserDetails userDetails);
    List<Project> findByName(String name);
    List<Project> findByKey(String key);
    List<Project> findByUserId(int userId);
    List<Project> findByOwner(int ownerId);
    List<Project> findByFilter(ProjectFilterParams filter);
    List<Project> findJointIn(int userId);
    WorkFlow createWorkFlow(WorkFlowParams params);
    WorkFlowItem addWorkFlowItem(WorkFlowParams params);
    WorkFlowItem addLinkWorkFlow(WorkFlowParams params);
    WorkFlowItem deleteLinkWorkFlow(WorkFlowParams params);
    WorkFlow deleteWorkFlowItem(WorkFlowParams params);
    void updateWorkFlowDiagram(List<WorkFlowParams> params);
    List<IssueType> getIssueTypes(Integer projectId, Integer requestedUserId);
}
