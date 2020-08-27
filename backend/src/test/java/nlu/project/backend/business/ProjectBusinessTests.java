package nlu.project.backend.business;

import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @MockBean
    UserDAO userDao;



    @Before
    public void setUp() {
        User user = new User();
        user.setId(1);

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

        when(userDao.isProductOwner(1 , 1)).thenReturn(true);


        when(userRepository.findById(1)).thenReturn(Optional.of(user));

    }

    @Test
    public void testCreateProjectSuccess() {
        List<WorkFlow> workflows = new ArrayList<>();
        WorkFlow workFlow = new WorkFlow();
        workFlow.setName("DEFAULT WORKFLOW");
        workFlow.setId(1);

        workflows.add(workFlow);

        when(workflowRepository.findDefault()).thenReturn(workflows);

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
        User u = userRepository.getOne(1);
        Project project = new Project();
        project.setCode("OLD");
        when(projectRepository.getOne(2)).thenReturn(project);

        ProjectParams params = new ProjectParams();
        params.id = 1;
        params.leader = 1;
        params.name = "Renamed Project";
        params.key = "OLD";
        params.description="This project is for testing";
        projectBusiness.update(params , u);
    }

    @Test(expected = InvalidInputException.class)
    public void testUpdateProjectFail() {

        User u = userRepository.getOne(1);
        Project project = new Project();
        project.setCode("OLD");
        when(projectRepository.getOne(2)).thenReturn(project);

        ProjectParams params = new ProjectParams();
        params.id = 1;
        params.leader = 1;
        params.name = "Update fail Project";
        params.key = "EXISTED";
        params.description="This project is for testing";
        projectBusiness.update(params, u);
    }

}
