import {ASYNC as AsynTypes} from '../../../constants/index'
import {All_WorkFlow } from '../../init/index'
const workFlowReducer = (state = All_WorkFlow, action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.ALL_WORKFLOW:
            nextState = action.payload;
            break;
        case AsynTypes.FULL_FILLED.UPDATE_WORKFLOW_LOC:
            if (action.payload.data != null)
                nextState.forEach(function (item, i) {
                    if(item.id == action.payload.workFlowId) {
                        item.nodeDataArray.forEach(function (node, j) {
                            if (node.key == action.payload.data.key) {
                                nextState[i].nodeDataArray[j] = action.payload.data
                            }
                        })
                    }
                })
            break;
        case AsynTypes.FULL_FILLED.NEW_WORKFLOW:
            let newWorkflow = {
                id: action.payload.id,
                name: action.payload.name,
                projectId: action.payload.project.id,
                nodeDataArray: [],
                linkDataArray: []
            }
            nextState = [...nextState, newWorkflow]
            break;
        case AsynTypes.FULL_FILLED.NEW_WORKFLOW_ITEM:
            let newNodeData = {
                key: action.payload.id,
                text: action.payload.name,
                color: action.payload.color,
                loc: action.payload.location
            }
            nextState = nextState.map(workFlow => {
                if (workFlow.id == action.payload.workFlow.id) {
                    workFlow.nodeDataArray = [...workFlow.nodeDataArray, newNodeData]
                }
                return workFlow
            })
            break;
        case AsynTypes.FULL_FILLED.NEW_WORKFLOW_LINK:
            let newLinkData = {
                key: -1,
                from: action.payload.id,
                to: action.payload.nextItems[action.payload.nextItems.length - 1].id
            }
            nextState = nextState.map(workFlow => {
                if (workFlow.id == action.payload.workFlow.id) {
                    let linkArray = workFlow.linkDataArray;
                    if (linkArray.length > 0)
                        newLinkData.key = linkArray[linkArray.length-1].key-1
                    workFlow.linkDataArray = [...workFlow.linkDataArray, newLinkData]
                }
                return workFlow
            })
            break;
        case AsynTypes.FULL_FILLED.REMOVE_WORKFLOW_ITEM:
            let removedIndex;
            nextState = nextState.map(workFlow => {
                if (workFlow.id == action.payload.workFlowId) {
                    workFlow.nodeDataArray.forEach((node, index) => {
                        if (node.key == action.payload.data) {
                            return workFlow.nodeDataArray = [...workFlow.nodeDataArray.slice(0, index), ...workFlow.nodeDataArray.slice(index+1)]
                        }
                    })

                }
                return workFlow
            })
            break;
        case AsynTypes.FULL_FILLED.REMOVE_WORKFLOW_LINK:
            let i = 0;
            nextState = nextState.map(workFlow => {
                if (workFlow.id == action.payload.workFlowId) {
                    while (i < workFlow.linkDataArray.length) {
                        if (isExistedInRemovedList(workFlow.linkDataArray[i].key, action.payload.data)) {
                            workFlow.linkDataArray = [...workFlow.linkDataArray.slice(0, i), ...workFlow.linkDataArray.slice(i+1)]
                        }
                        else
                            i++
                    }
                }
                return workFlow;
            })
            break;
        case AsynTypes.FULL_FILLED.DELETE_WORKFLOW:
            nextState.forEach((workFlow, index) => {
                if (workFlow.id == action.payload)
                    nextState = [...nextState.slice(0, index), ...nextState.slice(index+1)]
            })
            break;
        default:
            break;
    }
    return nextState;
}

const isExistedInRemovedList = (key, list) => {
    let result = false;
    list.forEach(i => {
        if (key == i)
            return result = true;
    })
    return result;
}

export default workFlowReducer;