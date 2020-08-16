package nlu.project.backend.business;

import nlu.project.backend.entry.filter.ProjectFilterParams;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.entry.project.UserRoleParams;
import nlu.project.backend.entry.project.WorkFlowParams;
import nlu.project.backend.model.*;
import nlu.project.backend.model.security.CustomUserDetails;
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
    WorkFlow createWorkFlow(WorkFlowParams params, User user);
    WorkFlowItem addWorkFlowItem(WorkFlowParams params, User user);
    WorkFlowItem addLinkWorkFlow(WorkFlowParams params, User user);
    WorkFlowItem deleteLinkWorkFlow(WorkFlowParams params, User user);
    UserRole addMember(UserRoleParams params);
    void removeMember(UserRoleParams params);
    UserRole addRoleToMember(UserRoleParams params);
    void removeRoleFromMember(UserRoleParams params);
    WorkFlowItem deleteWorkFlowItem(WorkFlowParams params, User user);
    List<IssueType> getIssueTypes(Integer projectId, Integer requestedUserId);
    List<Sprint> getWorkingSprints(Integer projectId, CustomUserDetails user);
    List<WorkFlow> getWorkFlow(int projectId);
    List<Issue> getBacklogItems(Integer projectId, CustomUserDetails user);
    WorkFlow getCurrentWorkFlow(Integer projectId);

    List<User> getDevTeam(Integer projectId, CustomUserDetails user);

    Project getProject(Integer projectId, CustomUserDetails user);

    Integer deleteWorkFlow(WorkFlowParams params, User user);

    Sprint getCurrentSprint(Integer projectId, CustomUserDetails user);
}
