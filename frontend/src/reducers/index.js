import { combineReducers } from 'redux'
import WorkSpace_WorkOn from './work-space/work-on-reducer'
import WorkSpace_Viewed from './work-space/viewed-reducer'
export default combineReducers({
    WorkSpace_WorkOn,
    WorkSpace_Viewed
})