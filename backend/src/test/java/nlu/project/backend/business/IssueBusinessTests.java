package nlu.project.backend.business;

import nlu.project.backend.entry.issue.IssueParams;
import nlu.project.backend.entry.issue.IssueTypeParams;
import nlu.project.backend.model.*;
import nlu.project.backend.model.security.CustomUserDetails;
import nlu.project.backend.repository.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import java.security.InvalidParameterException;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class IssueBusinessTests {
    @Autowired
    private IssueBusiness issueBusiness;

    @MockBean
    FileBusiness fileBusiness;

    //
    @MockBean
    IssueRepository issueRepository;

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
    PriorityRepository priorityRepository;

    @MockBean
    SprintRepository sprintRepository;

    @MockBean
    IssueTypeRepository issueTypeRepository;

    @MockBean
    WorkFlowItemRepository workFlowItemRepository;

    @Test
    public void testSaveFile() {
        Assert.assertEquals(fileBusiness.save(null), "/imgSavePath");
    }

    @Test
    public void TestCreateIssueTypeSuccess() {
        IssueTypeParams params = new IssueTypeParams();

        params.setCreateByUserId(1);
        params.setProjectId(1);
        params.setIconFile(null);
        params.setName("my issue type");

        IssueType returnObject = issueBusiness.createIssueType(params);
        Assert.assertEquals(returnObject.getId().intValue(), 1);
        Assert.assertEquals(returnObject.getProject().getId().intValue(), 1);
        Assert.assertEquals(returnObject.getIconUrl(), null);
        Assert.assertEquals(returnObject.getName(), "my issue type");

    }

    @Test(expected = InvalidParameterException.class)
    public void TestCreateIssueTypeNotSuccess() {
        // in this test case
        // the user want to create new issue type for a project
        // but the user haven't owner permission on that project
        // then the result is invalid parameter exception
        IssueTypeParams params = new IssueTypeParams();

        params.setCreateByUserId(1);
        params.setProjectId(2);
        params.setIconFile(null);
        params.setName("my issue type");
        IssueType returnObject = issueBusiness.createIssueType(params);

    }

    @Test
    public void TestFindByFilter() {


    }

    @Test
    public void TestDeleteIssueSuccess() {
        IssueParams issueParams = new IssueParams();
        issueParams.id = 1;
        issueParams.projectId = 1;

        User user = new User();
        user.setId(1);

        UserDetails userDetails = new CustomUserDetails(user);
        boolean result = issueBusiness.delete(issueParams , userDetails);
        verify(issueRepository, times(1)).deleteById(1);
        Assert.assertEquals(result , true);

    }

    @Test(expected = InvalidParameterException.class)
    public void TestDeleteIssueNotSuccess() {
        // in this test case
        // the user want to create delete issue  of a project
        // but the user haven't owner permission on that project
        // then the result is invalid parameter exception
        IssueParams issueParams = new IssueParams();
        issueParams.id = 1;
        issueParams.projectId = 2;

        User user = new User();
        user.setId(1);

        UserDetails userDetails = new CustomUserDetails(user);
        boolean result = issueBusiness.delete(issueParams , userDetails);

    }

    @Before
    public void setUp() {
        Mockito.when(fileBusiness.save(null)).thenReturn("/imgSavePath");

        User user1 = new User();
        user1.setId(1);


        Project project1 = new Project();
        project1.setId(1);


        UserRole userRole11 = new UserRole();
        userRole11.setUser(user1);
        userRole11.setProject(project1);

        Role r1 = new Role();
        r1.setId(1);
        userRole11.setRole(r1);
        userRole11.setId(1);

        Mockito.when(userRepository.getOne(1)).thenReturn(user1);
        Mockito.when(projectRepository.getOne(1)).thenReturn(project1);
        Mockito.when(userRoleRepository.findByUserAndProject(user1, project1)).thenReturn(userRole11);

        Mockito.when(issueTypeRepository.save(any(IssueType.class))).thenAnswer(new Answer<IssueType>() {
            @Override
            public IssueType answer(InvocationOnMock invocation) throws Throwable {
                Object[] arguments = invocation.getArguments();
                if (arguments != null && arguments.length > 0 && arguments[0] != null) {
                    IssueType ist = (IssueType) arguments[0];
                    ist.setId(1);
                    return ist;
                }
                return null;
            }
        });
    }

    @Test
    public void testGetUserRole() {
        User user1 = new User();
        user1.setId(1);

        Project project1 = new Project();
        project1.setId(2);
        UserRole userRole = userRoleRepository.findByUserAndProject(user1, project1);

        Assert.assertEquals(userRole.getRole().getId().intValue(), 1);

    }
}
