import React , {useEffect} from 'react'
import { connect } from 'react-redux'
import {pageContextualNavigation} from '../../actions/global'

import WorkFlowComponent from "../../components/workplace/project/WorkFlowComponent";
import {fetchAllWorkFlow, fullFilledUpdateWorkFlowLocation, updateWorkFlowLocation} from "../../actions/project";

const fakeWorkFlowList = [
    {
        id: 1,
        name: "Workflow 1",
        nodeDataArray: [
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
            { key: 1, text: 'Beta', color: '#777', loc: '150 0' },
            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
        ],
        linkDataArray: [
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
        ]
    },
    {
        id: 2,
        name: "Workflow 2",
        nodeDataArray: [
            { key: 0, text: 'A', color: 'lightblue', loc: '0 0' },
            { key: 1, text: 'B', color: 'lightblue', loc: '150 0' },
            { key: 2, text: 'C', color: 'lightblue', loc: '0 150' },
            { key: 3, text: 'D', color: 'lightblue', loc: '150 150' }
        ],
        linkDataArray: [
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
        ]
    }
]

const WorkFlow = function(props){
    const listWorkFlow = props.listWorkFlow;
    const fetchWorkFlows = props.fetchAllWorkFlow;
    const {projectId} = props.match.params

    useEffect(() => {
        props.getNavigation('WORKFLOW', props.match.params)
        fetchWorkFlows(projectId)
    }, [])
    return(
        <WorkFlowComponent listWorkFlow={listWorkFlow} updateWFLOC={props.updateWorkFlowLocation} fullFilledWFLOC={props.fullFilledUpdateWorkFlowLocation}/>
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
        updateWorkFlowLocation: (data) => dispatch(updateWorkFlowLocation(data)),
        fullFilledUpdateWorkFlowLocation: (data) => dispatch(fullFilledUpdateWorkFlowLocation(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkFlow)