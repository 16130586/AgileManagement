import React , {useEffect} from 'react'
import { connect } from 'react-redux'
import {pageContextualNavigation} from '../../actions/global'

import WorkFlowComponent from "../../components/workplace/project/WorkFlowComponent";
import {
    fetchAllWorkFlow,
    fullFilledUpdateWorkFlowItem,
    updateWorkFlowItem,
    createWorkFlow,
    addWorkFlowItem, addWorkFlowLink, fullFilledRemovedWorkFlowItem, fullFilledRemovedWorkFlowLink, deleteWorkFlow
} from "../../actions/project";

const WorkFlow = function(props){
    const listWorkFlow = props.listWorkFlow;
    const fetchWorkFlows = props.fetchAllWorkFlow;
    const {projectId} = props.match.params

    useEffect(() => {
        props.getNavigation('WORKFLOW', props.match.params)
        fetchWorkFlows(projectId)
    }, [])
    return(
        <WorkFlowComponent
            listWorkFlow={listWorkFlow}
            updateWorkFlow={props.updateWorkFlow}
            updateWorkFlowItem={props.fullFilledUpdateWorkFlowItem}
            createWorkFlow={props.createWorkFlow}
            addWorkFlowItem={props.addWorkFlowItem}
            addWorkFlowLink={props.addWorkFlowLink}
            projectId={projectId}
            removeWorkFlowItem={props.fullFilledRemovedWorkFlowItem}
            removeWorkFlowLink={props.fullFilledRemovedWorkFlowLink}
            deleteWorkFlow={props.deleteWorkFlow}
        />
    )
}
const mapStateToProps = state => {
    return {
        listWorkFlow: state.WorkFlow_Reducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNavigation : (pageName, data) => dispatch(pageContextualNavigation(pageName,data)),
        fetchAllWorkFlow: (projectId) => dispatch(fetchAllWorkFlow(projectId)),
        updateWorkFlow: (data) => dispatch(updateWorkFlowItem(data)),
        fullFilledUpdateWorkFlowItem: (data) => dispatch(fullFilledUpdateWorkFlowItem(data)),
        createWorkFlow: (data) => dispatch(createWorkFlow(data)),
        addWorkFlowItem: (data) => dispatch(addWorkFlowItem(data)),
        addWorkFlowLink: (data) => dispatch(addWorkFlowLink(data)),
        fullFilledRemovedWorkFlowItem: (workFlowId, data) => dispatch(fullFilledRemovedWorkFlowItem(workFlowId, data)),
        fullFilledRemovedWorkFlowLink: (workFlowId, data) => dispatch(fullFilledRemovedWorkFlowLink(workFlowId, data)),
        deleteWorkFlow: (workFlowId) => dispatch(deleteWorkFlow(workFlowId)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkFlow)