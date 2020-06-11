import {ASYNC as AsyncEventTypes} from '../constants/index'
export const deleteProject = (id) => ({type : AsyncEventTypes.REQUEST.DELETE_PROJECT, payload: id})
export const fetchProjectGrid = () => ({type:AsyncEventTypes.LOAD_MORE.PROJECT_GRID})
export const fullFilledProjectGrid = (data) => ({type: AsyncEventTypes.FULL_FILLED.PROJECT_GRID, payload: data})
export const fullFilledDeleteProject = (id) => ({type: AsyncEventTypes.FULL_FILLED.DELETE_PROJECT, payload: id})