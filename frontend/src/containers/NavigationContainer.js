import React, { Fragment, useState } from 'react'
import GlobalNavigationContainer from '../containers/GlobalNavigationContainer'
import ContextualNavigationComponent from '../components/navigation/ContextualNavigation'
import { connect } from 'react-redux'
let CollapseContextualNavigationButton = function (props) {
    let [isHidden, setIsHidden] = useState(false)
    let [currentState, setCurrentState] = useState('OPEN')
    let getCurrentIcon = (state) => {
        return state === 'OPEN' ? '<' : '>'
    }
    let getNextState = () => {
        return currentState === "OPEN" ? "CLOSED" : "OPEN"
    }
    return (
        <Fragment>
            <button className={props.className} onClick={() => {
                let nextState = getNextState()
                setCurrentState(nextState)
                props.toggle(nextState)
            }}
                style={{ opacity: isHidden ? 0 : 1 }}>{getCurrentIcon(currentState)}</button>
        </Fragment>
    )
}
let NavigationContainer = function (props) {
    let [currentContextualState, setContextualState] = useState("OPEN")
    let nextContextualDisplay = (state = currentContextualState) => {
        return {
            width: state === "OPEN" ? "15rem" : "1.3rem"
        }
    }

    return (
        <Fragment>
            <div className={props.className}>
                <div className="main__global-navigation">
                    <GlobalNavigationContainer />
                </div>
                <div className="separator"></div>
                <div style={nextContextualDisplay(currentContextualState)} className="main__contextual-navigation">
                    {currentContextualState === "OPEN" &&  <ContextualNavigationComponent navItems={props.navItems}/>}
                </div>
            </div>
            <div className="main__contextual-collapse__container">
                <CollapseContextualNavigationButton className="main__contextual-collapse__container__button"
                    toggle={setContextualState} />
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        navItems : state.Common.navItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);