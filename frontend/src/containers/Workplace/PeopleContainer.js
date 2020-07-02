import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'

import PeopleComponent from '../../components/workplace/people/Index'
import GroupContainer from './people/GroupContainer'

let tabs = {
    "0": GroupContainer
}
let PeopleContainer = function(props){
    return(
        <Fragment>
            <PeopleComponent tabs={tabs} />
        </Fragment>
    )
}

export default PeopleContainer;
