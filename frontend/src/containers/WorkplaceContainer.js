import React, {useEffect} from 'react'
import { Route, Switch } from 'react-router-dom';
import YourWork from './Workplace/YourWorkContainer'
import Project from './Workplace/ProjectsContainer'
import People from './Workplace/PeopleContainer'
import RoadMap from './project/RoadMap'
import Backlog from './project/Backlog'
import Board from './project/Board'
import WorkFlow from "./project/WorkFlow"
import BurndownChart from "./project/BurndownChart"
import VelocityChart from "./project/VelocityChart";
import Settings from './project/Settings'
import IssueDetail from "./project/IssueDetailContainer"
import {connect} from "react-redux"
import {fetchAboutMe} from "../actions/global";
import SubTaskDetail from "./project/SubTaskDetailContainer";
let WorkplaceContainer = function (props) {
    useEffect(() => {
        props.fetchAboutMe()
    }, [])

    return (
        <div className={props.className}>
            <Switch>
                <Route path="/your-work">
                    <YourWork />
                </Route>
                <Route path="/projects">
                    <Project />
                </Route>
                <Route path="/dashboard">
                    <div>dashboard</div>
                </Route>
                <Route path="/people">
                    <People />
                </Route>
                <Route path="/project/:projectId/roadmap" component={RoadMap} />
                <Route path="/project/:projectId/backlog" component={Backlog} />
                <Route path="/project/:projectId/boards" component={Board} />
                <Route path="/project/:projectId/workflow" component={WorkFlow} />
                <Route path="/project/:projectId/charts/burndown" component={BurndownChart} />
                <Route path="/project/:projectId/charts/velocity" component={VelocityChart} />
                <Route path="/project/:projectId/settings/details" component={Settings} />
                <Route path="/project/:projectId/issue/:issueId/subtask/:subTaskId" component={SubTaskDetail}/>
                <Route path="/project/:projectId/issue/:issueId" component={IssueDetail}/>
                <Route exact path="/">
                    <div>Welcome</div>
                </Route>

            </Switch>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAboutMe: () => dispatch(fetchAboutMe())
    }
}

export default connect(null, mapDispatchToProps)(WorkplaceContainer);