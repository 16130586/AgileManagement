import React , {useEffect} from 'react'
import { connect } from 'react-redux'
import {comment, createSubTask, fetchIssue, updateIssueDescription, updateIssueDetails} from "../../actions/project";
import IssueDetailComponent from "../../components/project/issue/IssueDetailComponent";
import {pageContextualNavigation} from "../../actions/global";

const IssueDetailContainer = function(props){
    const fetchIssue = props.fetchIssueById
    const { projectId,issueId } = props.match.params
    useEffect(() => {
        props.getNavigation('ISSUE', props.match.params)
    }, [])
    useEffect(() => {
        fetchIssue(projectId,issueId)
    }, [])

    return(
        <IssueDetailComponent
            issue={props.issue}
            issueTypes={props.issueTypes}
            devTeam={props.devTeam}
            priority={props.priority}
            project={props.project}
            workFlow={props.workFlow}
            createSubTask={props.createSubTask}
            subTasks={props.subTasks}
            updateIssueDescription={props.updateIssueDescription}
            updateIssue={props.updateIssue}
            comments={props.comments}
            me={props.me}
            comment={props.comment}
        />
    )
}
const mapStateToProps = state => {
    return {
        issue: state.IssueReducer.issue,
        issueTypes: state.IssueReducer.issueTypes,
        devTeam: state.IssueReducer.devTeam,
        priority: state.IssueReducer.priority,
        project: state.IssueReducer.project,
        workFlow: state.IssueReducer.workFlow,
        subTasks: state.IssueReducer.subTasks,
        comments: state.IssueReducer.comments,
        me: state.Common.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchIssueById: (projectId, issueId) => dispatch(fetchIssue(projectId, issueId)),
        createSubTask: (data) => dispatch(createSubTask(data)),
        updateIssueDescription: (data) => dispatch(updateIssueDescription(data)),
        updateIssue: (data) => dispatch(updateIssueDetails(data)),
        getNavigation : (pageName,data) => dispatch(pageContextualNavigation(pageName,data)),
        comment: (data) => dispatch(comment(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailContainer)