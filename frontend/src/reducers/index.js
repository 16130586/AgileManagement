import { combineReducers } from 'redux'
import WorkSpace_YourWork_WorkOn from './work-space/your-work/work-on-reducer'
import WorkSpace_YourWork_Viewed from './work-space/your-work/viewed-reducer'
import WorkSpace_YourWork_AssignToMe from './work-space/your-work/assign-to-me-reducer'
export default combineReducers({
    WorkSpace_YourWork_WorkOn,
    WorkSpace_YourWork_Viewed,
    WorkSpace_YourWork_AssignToMe
})