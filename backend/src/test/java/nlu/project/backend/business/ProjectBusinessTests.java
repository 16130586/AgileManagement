package nlu.project.backend.business;

import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.Project;
import nlu.project.backend.model.Role;
import nlu.project.backend.model.User;
import nlu.project.backend.model.UserRole;
import nlu.project.backend.repository.*;
import nlu.project.backend.util.constraint.ConstraintRole;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProjectBusinessTests {
    @Autowired
    ProjectBusiness projectBusiness;

    @MockBean
    UserRepository userRepository;

    @MockBean
    ProjectRepository projectRepository;

    @MockBean
    UserRoleRepository userRoleRepository;

    @MockBean
    RoleRepository roleRepository;

    @MockBean
    BacklogRepository backlogRepository;

    @MockBean
    FileBusiness fileBusiness;

    @MockBean
    WorkflowRepository workflowRepository;

    @MockBean
    WorkFlowItemRepository itemRepository;

    @MockBean
    IssueTypeRepository issueTypeRepository;

    @Before
    public void setUp() {
        User user = new User();
        Role role = new Role();
        Project project = new Project();
        UserRole userRole = new UserRole(1, user, role, project);

        when(userRoleRepository.save(any(UserRole.class))).thenAnswer(new Answer<Object>() {
            @Override
            public Object answer(InvocationOnMock invocation) throws Throwable {
                Object[] arguments = invocation.getArguments();
                if (arguments != null && arguments.length > 0 && arguments[0] != null) {
                    return arguments[0];
                }
                return null;
            }
        });
        when(projectRepository.save(any(Project.class))).thenAnswer(new Answer<Object>() {
            @Override
            public Object answer(InvocationOnMock invocation) throws Throwable {
                Object[] arguments = invocation.getArguments();
                if (arguments != null && arguments.length > 0 && arguments[0] != null) {
                    return arguments[0];
                }
                return null;
            }
        });
        when(userRoleRepository.save(any(UserRole.class))).then(new Answer<Object>() {
            @Override
            public Object answer(InvocationOnMock invocation) throws Throwable {
                Object[] arguments = invocation.getArguments();
                if (arguments != null && arguments.length > 0 && arguments[0] != null) {
                    return arguments[0];
                }
                return null;
            }
        });
        when(userRoleRepository.findByRoleAndProject(any(Role.class), any(Project.class))).thenReturn(userRole);
        when(roleRepository.findByName(anyString())).thenReturn(role);
        when(projectRepository.existsByName("Existed Name")).thenReturn(true);
        when(projectRepository.existsByCode("EXISTED")).thenReturn(true);
        when(projectRepository.getOne(1)).thenReturn(project);
        when(userRepository.getOne(1)).thenReturn(user);
    }

    @Test
    public void testCreateProjectSuccess() {
        ProjectParams params = new ProjectParams();
        params.name = "Project test";
        params.leader = 1;
        params.productOwner = 1;
        params.key = "TEST";
        params.description="This project is for testing";

        projectBusiness.create(params);
    }

    @Test(expected = InvalidInputException.class)
    public void testCreateProjectFail() {
        ProjectParams params = new ProjectParams();
        params.name = "Existed Name";
        params.leader = 1;
        params.productOwner = 1;
        params.key = "TEST";
        params.description="This project is for testing";
        projectBusiness.create(params);
    }

    @Test
    public void testUpdateProjectSuccess() {
        Project project = new Project();
        project.setCode("OLD");
        when(projectRepository.getOne(2)).thenReturn(project);

        ProjectParams params = new ProjectParams();
        params.id = 2;
        params.leader = 1;
        params.name = "Renamed Project";
        params.key = "OLD";
        params.description="This project is for testing";
        projectBusiness.update(params);
    }

    @Test(expected = InvalidInputException.class)
    public void testUpdateProjectFail() {
        Project project = new Project();
        project.setCode("OLD");
        when(projectRepository.getOne(2)).thenReturn(project);

        ProjectParams params = new ProjectParams();
        params.id = 2;
        params.leader = 1;
        params.name = "Update fail Project";
        params.key = "EXISTED";
        params.description="This project is for testing";
        projectBusiness.update(params);
    }

}
