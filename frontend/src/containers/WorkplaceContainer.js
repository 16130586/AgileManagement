import React from 'react'
import { Route, Switch } from 'react-router-dom';
import YourWork from './Workplace/YourWorkContainer'
import Project from './Workplace/ProjectsContainer'
import People from './Workplace/PeopleContainer'

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
                <Route path="/people">
                    <People />
                </Route>
                <Route exact path="/">
                    <div>Welcome</div>
                </Route>
            </Switch>
        </div>
    )
}

export default WorkplaceContainer