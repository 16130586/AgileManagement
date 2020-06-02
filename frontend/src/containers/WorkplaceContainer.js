import React from 'react'
import { Route, Switch } from 'react-router-dom';
import YourWork from './workplace/YourWorkContainer'
let WorkplaceContainer = function(props){
    return (
        <div className={props.className}>
            <Switch>
                <Route path="/your-work">
                    <YourWork/>
                </Route>
                <Route path="/projects">
                    <div>projects</div>
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