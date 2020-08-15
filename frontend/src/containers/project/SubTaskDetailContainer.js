import React , {useEffect} from 'react'
import { connect } from 'react-redux'
import SubTaskDetailComponent from '../../components/project/issue/SubTaskDetailComponent'
import {fetchSubTaskPage, logWork, updateSubTask} from "../../actions/project";

const SubTaskDetail = function(props){
    const projectId = 1;
    const issueId = 3;
    const subTaskId = 1;
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubTaskDetail)