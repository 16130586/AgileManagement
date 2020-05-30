import { combineEpics } from 'redux-observable';
import WorkSpace_WorkOn from './work-space/work-on/index';
import WorkSpace_Viewed from './work-space/viewed/index';

export default combineEpics(
    WorkSpace_WorkOn,
    WorkSpace_Viewed
);