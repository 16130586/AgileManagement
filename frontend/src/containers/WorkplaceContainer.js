import React from 'react'
import { Route, Switch } from 'react-router-dom';
import YourWork from './workplace/YourWorkContainer'
import Project from './workplace/ProjectsContainer'

let WorkplaceContainer = function (props) {

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
                <Route exact path="/">
                    <div>Welcome</div>
                </Route>
            </Switch>
        </div>
    )
}

export default WorkplaceContainer