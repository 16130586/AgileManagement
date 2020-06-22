import { combineEpics } from 'redux-observable'
import WorkSpace_WorkOn from './work-space/your-work/work-on/index'
import WorkSpace_Viewed from './work-space/your-work/viewed/index'
import {fetchTotalAssignToMeEpic , fetchWorkOnEpic} from './work-space/your-work/assign-to-me/index'
import {deleteProject , fetchProjects} from './work-space/project'
import {validateToken, login} from './global'
export default combineEpics(
    WorkSpace_WorkOn,
    WorkSpace_Viewed,
    fetchTotalAssignToMeEpic,
    fetchWorkOnEpic,
    deleteProject,
    fetchProjects,
    validateToken,
    login
);