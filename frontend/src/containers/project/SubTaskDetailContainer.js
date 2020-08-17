import React , {useEffect} from 'react'
import { connect } from 'react-redux'
import SubTaskDetailComponent from '../../components/project/issue/SubTaskDetailComponent'
import {fetchSubTaskPage, logWork, updateSubTask} from "../../actions/project";
import {pageContextualNavigation} from "../../actions/global";

const SubTaskDetail = function(props){
    const { projectId,issueId,subTaskId } = props.match.params;
    useEffect(() => {
        props.getNavigation('SUBTASK', props.match.params)
    }, [])
    useEffect(() => {
        props.fetchSubTaskPage({projectId: projectId, issueId: issueId, subTaskId: subTaskId})
    }, [])

    return(
        <SubTaskDetailComponent
            subTask={props.subTask}
            devTeam={props.devTeam}
            workFlow={props.workFlow}
            project={props.project}
            issue={props.issue}
            me={props.me}
            updateSubTask={props.updateSubTask}
            logWork={props.logWork}
        />
    )
}
const mapStateToProps = state => {
    return {
        subTask: state.SubTaskReducer.subTask,
        devTeam: state.SubTaskReducer.devTeam,
        workFlow: state.SubTaskReducer.workFlow,
        project: state.SubTaskReducer.project,
        issue: state.SubTaskReducer.issue,
        me: state.Common.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchSubTaskPage: (data) => dispatch(fetchSubTaskPage(data)),
        updateSubTask: (data) => dispatch(updateSubTask(data)),
        logWork: (data) => dispatch(logWork(data)),
        getNavigation : (pageName,data) => dispatch(pageContextualNavigation(pageName,data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubTaskDetail)