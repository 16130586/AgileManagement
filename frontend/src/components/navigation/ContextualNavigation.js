import React, { useState, Fragment } from 'react';
import DashBoard from './contextual-items/DashBoard';
import Filter from './contextual-items/Filter';
import FilterSelections from './contextual-items/FilterSelections';
import Projects from './contextual-items/Project';
import YourWork from './contextual-items/YourWork';
let navItemsConfig = [YourWork, Projects, DashBoard, Filter]
Filter.prototype.component = FilterSelections

function ContextualNavigation(props) {
    let [history, setHistory] = useState([])
    let navItems = navItemsConfig
    let ContextComponent = history.length > 0 ? history[history.length - 1] : null

    let changeContext = (next) => {
        setHistory(history.concat([next]))
    }
    let goBack = () => {
        history.pop()
        setHistory(history.length > 0 ? [...history] : [])
    }
    return (
        <div style={{overflow: "hidden" , width: "100%" ,  backgroundColor : "inherit" , color: "inherit"}}>
            <div className="contextual-navigation__header">
                <h2>Real Ng</h2>
            </div>
            {
                ContextComponent != null &&
                <div>
                    <a href="#" onClick={goBack}>Back button</a>
                    <ContextComponent changeContext={changeContext} />
                </div>
            }
            <ul className="contextual-navigation__items">
                {ContextComponent == null &&
                    <div>
                        {
                            navItems.map(e => {
                                let E = e
                                if (e.prototype.component) {
                                    return <E className="contextual-navigation__item"
                                        onClick={() => {
                                            changeContext(e.prototype.component)
                                        }} />
                                }
                                return <E className="contextual-navigation__item" />
                            })
                        }
                    </div>
                }
            </ul>
        </div>
    )
}
export default ContextualNavigation