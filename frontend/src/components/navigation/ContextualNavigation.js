import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
function ContextualNavigation(props) {
    let [history, setHistory] = useState([])
    let navItems = props.navItems
    let ContextComponent = history.length > 0 ? history[history.length - 1] : null

    let changeContext = (next) => {
        setHistory(history.concat([next]))
    }
    let goBack = () => {
        history.pop()
        setHistory(history.length > 0 ? [...history] : [])
    }
    return (
        <div style={{ overflow: "hidden", width: "100%", backgroundColor: "inherit", color: "inherit" }}>
            <div className="contextual-navigation__header">
                <h2>Real Ng</h2>
            </div>
            {
                ContextComponent != null &&
                <div>
                    <div>
                        <Button onClick={goBack} style={{ width: "150%", marginLeft: "-38%", color: "white" }}>
                            <ArrowBackIcon></ArrowBackIcon>
                            <span className="ml-2" style={{textTransform: "none"}}>Go back</span>
                        </Button>
                    </div>
                    <div 
                    className="mt-1"
                    style={{
                        width: "100%",
                        marginLeft: "18%",
                        height: "1px",
                        backgroundColor : "rgba(158, 158, 158 , 0.4)"
                    }}></div>
                    <ContextComponent {...props.data} changeContext={changeContext} />
                </div>
            }
            <ul className="contextual-navigation__items">
                {ContextComponent == null &&
                    <div>
                        {
                            navItems.map(e => {
                                let E = e
                                if (e.prototype && e.prototype.component) {
                                    return <E className="contextual-navigation__item"
                                        {...props.data}
                                        onClick={() => {
                                            changeContext(e.prototype.component)
                                        }} />
                                }
                                return <E {...props.data} className="contextual-navigation__item" />
                            })
                        }
                    </div>
                }
            </ul>
        </div>
    )
}
export default ContextualNavigation