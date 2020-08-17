import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { pageContextualNavigation } from '../../actions/global'
import BurndownChartComponent from '../../components/project/chart/Burndown'
const Burndown = function (props) {

    useEffect(() => {
        props.getNavigation('CHARTS', props.match.params)
    }, [])
    const { projectId } = props.match.params
    return (
        <BurndownChartComponent
            project={props.project}
            feedData={props.feedData}
        />
    )
}
const mapStateToProps = state => {
    return {
       // project: state.Project_Chart_BurnDown.project,
       //  feedData : state.Project.Chart_Velocity.feedData,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNavigation: (pageName, data) => dispatch(pageContextualNavigation(pageName, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Burndown)