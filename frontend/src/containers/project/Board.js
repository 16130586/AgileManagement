import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { pageContextualNavigation } from '../../actions/global'
import {
    fetchBoardPage, requestDADIssue,
    requestBoardFilterIssue, requestCompleteSprint,
    requestDeleteIssue,
}
    from '../../actions/project'

import BoardSpaceComponent from '../../components/project/BoardComponent'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { navigateTo} from '../../actions/global'

const Board = function (props) {
    const projectId = parseInt(props.match.params.projectId)
    useEffect(() => {
        props.getNavigation('BOARDS', props.match.params)
    }, [])
    useEffect(() => {
        if (!props.isLoadBoardPage) {
            props.fetchBoardPage(projectId)
        }
    }, [props.isLoadBoardPage])

    return (
        <DndProvider backend={HTML5Backend}>
            <BoardSpaceComponent
                projectId={projectId}
                user={props.user}
                project={props.project}
                workflow={props.workflow}
                issueTypes={props.issueTypes}
                devTeam={props.devTeam}
                sprint={props.sprint}
                onDropIssueBox={props.onDropIssueBox}
                navigateTo={props.navigateTo}
                filterIssue={props.filterIssue}
                onFilterResult={props.onFilterResult}
                completeSprint={props.completeSprint}
                deleteIssue={props.deleteIssue}
            ></BoardSpaceComponent>
        </DndProvider>

    )
}
const mapStateToProps = state => {
    return {
        user: state.Common.user,
        project: state.Project_Board.project,
        workflow: state.Project_Board.workflow,
        issueTypes: state.Project_Board.issueTypes,
        isLoadBoardPage: state.Project_Board.isLoadBoardPage,
        devTeam: state.Project_Board.devTeam,
        sprint: state.Project_Board.sprint,
        onFilterResult : state.Project_Board.onFilter
    }
}
const mapDispatchToProps = dispatch => {
    return {
        navigateTo: (url) => dispatch(navigateTo(url)),
        getNavigation: (pageName, data) => dispatch(pageContextualNavigation(pageName, data)),
        fetchBoardPage: (projectId) => dispatch(fetchBoardPage(projectId)),
        onDropIssueBox: (data) => dispatch(requestDADIssue(data)),
        filterIssue : (filter) => dispatch(requestBoardFilterIssue(filter)),
        completeSprint: (sprintId) => dispatch(requestCompleteSprint(sprintId)),
        deleteIssue: (issueId, projectId) => dispatch(requestDeleteIssue(issueId, projectId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Board)