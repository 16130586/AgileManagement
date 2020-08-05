import { combineEpics } from 'redux-observable'
import WorkSpace_WorkOn from './work-space/your-work/work-on/index'
import WorkSpace_Viewed from './work-space/your-work/viewed/index'
import {fetchTotalAssignToMeEpic , fetchWorkOnEpic} from './work-space/your-work/assign-to-me/index'
import {deleteProject , fetchProjects , createProject} from './work-space/project'
import {validateToken, login, signUp} from './global'
import {fetchGroup}  from "./work-space/people/group/index";
import {
    fetchWorkFlows,
    updateWorkFlows,
    createWorkFlow,
    addWorkFlowItem,
    addWorkFlowLink
} from "./work-space/project/workflow-epic";

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
    fetchGroup,
    fetchWorkFlows,
    updateWorkFlows,
    createWorkFlow,
    addWorkFlowItem,
    addWorkFlowLink
);