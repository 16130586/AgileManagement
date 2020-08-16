import { combineEpics } from 'redux-observable'
import WorkSpace_WorkOn from './work-space/your-work/work-on/index'
import WorkSpace_Viewed from './work-space/your-work/viewed/index'
import {fetchTotalAssignToMeEpic , fetchWorkOnEpic} from './work-space/your-work/assign-to-me/index'
import {deleteProject , fetchProjects , createProject, searchProject} from './work-space/project'
import {validateToken, login, signUp} from './global'
import {fetchGroup}  from "./work-space/people/group/index";
import {getProject, updateProject, addMember, removeMember} from './project/setting'
import {
    fetchWorkFlows,
    updateWorkFlows,
    createWorkFlow,
    addWorkFlowItem,
    addWorkFlowLink
} from "./work-space/project/workflow-epic";

import {fetchBacklogPage as Project_Backlog_Page,
        topOfBacklog as Project_Top_Of_Backlog,
        bottomOfBacklog as Project_Bottom_Of_Backlog,
        deleteSprint as Project_Delete_Sprint,
        moveUp as Project_Move_Up_Sprint,
        moveDown as Project_Move_Down_Sprint,
        createSprint as Project_Create_Sprint,
        editSprint as Project_Edit_Sprint,
        startSprint as Project_Start_Sprint,
        deleteIssue as Project_Delete_Issue,
        moveIssueToSprint as Project_Move_Issue,
        createNewIssue as Project_Create_New_Issue,
        completeSprint as Project_Complete_Sprint,
} from "./project/backlog" 
export default combineEpics(
    login,
    signUp,
    validateToken,
    WorkSpace_WorkOn,
    WorkSpace_Viewed,
    fetchTotalAssignToMeEpic,
    fetchWorkOnEpic,
    deleteProject,
    fetchProjects,
    createProject,
    addMember,
    removeMember,
    getProject,
    updateProject,
    fetchGroup,
    searchProject,
    fetchWorkFlows,
    updateWorkFlows,
    createWorkFlow,
    addWorkFlowItem,
    addWorkFlowLink,
    Project_Backlog_Page,
    Project_Top_Of_Backlog,
    Project_Bottom_Of_Backlog,
    Project_Delete_Sprint,
    Project_Move_Up_Sprint,
    Project_Move_Down_Sprint,
    Project_Create_Sprint,
    Project_Edit_Sprint,
    Project_Start_Sprint,
    Project_Delete_Issue,
    Project_Move_Issue,
    Project_Create_New_Issue,
    Project_Complete_Sprint,
);