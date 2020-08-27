package nlu.project.backend.business;

import nlu.project.backend.DAO.ProjectDAO;
import nlu.project.backend.DAO.SprintDAO;
import nlu.project.backend.DAO.SprintVelocityDAO;
import nlu.project.backend.DAO.UserDAO;
import nlu.project.backend.business.impl.SprintBusinessImp;
import nlu.project.backend.entry.sprint.CreateSprintParams;
import nlu.project.backend.entry.sprint.StartSprintParams;
import nlu.project.backend.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class SprintBusinessTests {
    @Mock
    UserDAO userDAO;

    @Mock
    ProjectDAO projectDAO;

    @Mock
    SprintDAO sprintDao;

    @Mock
    SprintVelocityDAO sprintVelocityDAO;

    @InjectMocks
    SprintBusinessImp sprintBusiness;



    @Before
    public void setUp(){
        User user = new User();
        user.setId(1);

        List<WorkFlowItem> workFlowItemList = new LinkedList<>();

        WorkFlowItem startItem = new WorkFlowItem();
        startItem.setStart(true);
        startItem.setName("Not started!");
        workFlowItemList.add(startItem);

        WorkFlowItem endItem = new WorkFlowItem();
        endItem.setName("End!");
        endItem.setEnd(true);
        workFlowItemList.add(endItem);

        WorkFlow defaultWorkFlow = new WorkFlow();
        defaultWorkFlow.setId(1);
        defaultWorkFlow.setName("Default workflow");
        defaultWorkFlow.setItems(workFlowItemList);

        Project pj = new Project();
        pj.setId(1);
        pj.setCurrentWorkFlow(defaultWorkFlow);


        Mockito.when(userDAO.getUser(1)).thenReturn(user);
        Mockito.when(projectDAO.getProjectById(1)).thenReturn(pj);
        Mockito.when(userDAO.isProductOwner(1 , 1)).thenReturn(true);

        List<Sprint> sprints = new ArrayList<>();

        Mockito.when(sprintDao.findWorkingSprints(1)).thenReturn(sprints);
        Mockito.when(sprintDao.getNextName(1)).thenReturn("Sprint 1");
        Mockito.when(sprintDao.add(any(Sprint.class))).thenAnswer(invocation -> {
            Object[] arguments = invocation.getArguments();
            if (arguments != null && arguments.length > 0 && arguments[0] != null) {
                Sprint sprint = (Sprint) arguments[0];
                sprint.setId(1);
                return sprint;
            }
            return null;
        });

        Sprint sprint = new Sprint();
        sprint.setId(1);
        sprint.setName("Sprint 1");
        sprint.setIssues(new LinkedList<>());
        sprint.setOrder(0);
        sprint.setStatus(0);
        sprint.setProject(pj);
        Mockito.when(sprintDao.getOne(1)).thenReturn(sprint);
        Mockito.when(sprintDao.update(any(Sprint.class))).then(invocation -> {
            Object[] arguments = invocation.getArguments();
            if (arguments != null && arguments.length > 0 && arguments[0] != null) {
                Sprint spt = (Sprint) arguments[0];
                return sprint;
            }
            return null;
        });


        //



        Project pj2 = new Project();
        pj2.setId(2);
        pj2.setCurrentWorkFlow(defaultWorkFlow);

        Sprint sprint2 = new Sprint();
        sprint2.setId(2);
        sprint2.setName("Sprint 1");
        sprint2.setIssues(new LinkedList<>());
        sprint2.setOrder(0);
        sprint2.setStatus(0);
        sprint2.setProject(pj2);

        Mockito.when(sprintDao.getOne(2)).thenReturn(sprint2);
        Mockito.when(userDAO.isProductOwner(1 , 2)).thenReturn(false);
    }

    @Test
    public void testCreateSprintSuccess(){
        // mocking user from http header - authorization
        User user = userDAO.getUser(1);

        CreateSprintParams createSprintParams = new CreateSprintParams();
        createSprintParams.projectId = 1;
        Sprint result = sprintBusiness.create(createSprintParams, user);
        Assert.assertEquals(1 , result.getId().intValue());
        Assert.assertEquals(0 , result.getOrder().intValue());
        Assert.assertEquals("Sprint 1" , result.getName());
    }

    @Test(expected = InvalidParameterException.class)
    public void testCreateSprintFailed(){
        // mocking user from http header - authorization
        User user = userDAO.getUser(1);
        CreateSprintParams createSprintParams = new CreateSprintParams();
        createSprintParams.projectId = 2;
        Sprint result = sprintBusiness.create(createSprintParams, user);
    }

    @Test
    public void testEndSprintSuccess(){
        // mocking user from http header - authorization
        User user = userDAO.getUser(1);
        Sprint result = sprintBusiness.endSprint(1 , user);
        Assert.assertEquals(2,result.getStatus().intValue());
    }

    @Test(expected = InvalidParameterException.class)
    public void testEndSprintEndFailed(){
        // mocking user from http header - authorization
        User user = userDAO.getUser(1);
        Sprint result = sprintBusiness.endSprint(2 , user);
        Assert.assertEquals(2,result.getStatus().intValue());
    }

    @Test
    public void testStartSprintSuccess(){
        // mocking user from http header - authorization
        User user = userDAO.getUser(1);
        StartSprintParams params = new StartSprintParams();
        params.sprintId = 1;
        params.name = "Start sprint 1";
        params.goal = " Goal 1";
        params.startDate = new Date(System.currentTimeMillis());
        params.endDate = new Date(System.currentTimeMillis() + 604800000);

        Sprint result = sprintBusiness.startSprint(params,user);
        Assert.assertEquals(1 , result.getStatus().intValue());
    }
    @Test(expected = InvalidParameterException.class)
    public void testStartSprintFailed(){
        // mocking user from http header - authorization
        User user = userDAO.getUser(1);
        StartSprintParams params = new StartSprintParams();
        params.sprintId = 2;
        params.name = "Start sprint 2";
        params.goal = " Goal 2";
        params.startDate = new Date(System.currentTimeMillis());
        params.endDate = new Date(System.currentTimeMillis() + 604800000);

        Sprint result = sprintBusiness.startSprint(params,user);
    }

}
