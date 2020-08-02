import {ASYNC as AsyncEventTypes} from '../constants/index'
export const deleteProject = (id) => ({type : AsyncEventTypes.REQUEST.DELETE_PROJECT, payload: id})
export const createProject = (payload) => ({type : AsyncEventTypes.REQUEST.CREATE_PROJECT , payload})
export const createProjectSuccess = (projectCreated) => ({type : AsyncEventTypes.REQUEST.CREATE_PROJECT_SUCCESS , payload : projectCreated})
export const createProjectFailed = (msg) => ({type : AsyncEventTypes.REQUEST.CREATE_PROJECT_FAILED , payload : msg})
export const fetchProjectGrid = () => ({type:AsyncEventTypes.LOAD_MORE.PROJECT_GRID})
export const fullFilledProjectGrid = (data) => ({type: AsyncEventTypes.FULL_FILLED.PROJECT_GRID, payload: data})
export const fullFilledDeleteProject = (id) => ({type: AsyncEventTypes.FULL_FILLED.DELETE_PROJECT, payload: id})

export const searchProject = (data) => ({type: AsyncEventTypes.REQUEST.SEARCH_PROJECT, payload: data})
export const fullFilledSearchProject = (data) => ({type: AsyncEventTypes.FULL_FILLED.SEARCH_PROJECT, payload: data});