import { combineReducers } from 'redux'
import Common from './common'
import Login from './login'
import WorkSpace_YourWork_WorkOn from './work-space/your-work/work-on-reducer'
import WorkSpace_YourWork_Viewed from './work-space/your-work/viewed-reducer'
import WorkSpace_YourWork_AssignToMe from './work-space/your-work/assign-to-me-reducer'
import WorkSpace_Project from './work-space/project'
export default combineReducers({
    WorkSpace_YourWork_WorkOn,
    WorkSpace_YourWork_Viewed,
    WorkSpace_YourWork_AssignToMe,
    WorkSpace_Project,
    Common,
    Login
})