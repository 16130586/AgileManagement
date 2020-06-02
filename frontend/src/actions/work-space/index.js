import {ASYNC as AsyncTypes} from '../../constants/index'
export const fetchWorkOnItem = (page,pageSize) => ({type: AsyncTypes.LOAD_MORE.WORK_ON , payload : {page, pageSize}})
export const fullFilledWorkOnItem = (items) => ({type : AsyncTypes.FULL_FILLED.WORK_ON , payload: {data : items}})

export const fetchViewedItem = (page,pageSize) => ({type: AsyncTypes.LOAD_MORE.MORE_VIEWED , payload : {page, pageSize}})
export const fullFilledViewedItem = (items) => ({type : AsyncTypes.FULL_FILLED.MORE_VIEWED , payload: {data : items}})

export const fetchAssignedItem = (page,pageSize) => ({type: AsyncTypes.LOAD_MORE.ASSIGNED_TO_ME , payload : {page, pageSize}})
export const fullFilledAssignedItem = (items) => ({type : AsyncTypes.FULL_FILLED.ASSIGNED_TO_ME , payload: {data : items}})

export const fetchStarredItem = (page,pageSize) => ({type: AsyncTypes.LOAD_MORE.STARRED , payload : {page, pageSize}})
export const fullFilledStarredItem = (items) => ({type : AsyncTypes.FULL_FILLED.STARRED , payload: {data : items}})

export const fetchTotalAssignToMe = () => ({type : AsyncTypes.LOAD_MORE.TOTAL_ASSIGN_TO_ME})
export const fullFilledTotalAssignToMe = (total) => ({type : AsyncTypes.FULL_FILLED.TOTAL_ASSIGN_TO_ME , payload: {data : total}})