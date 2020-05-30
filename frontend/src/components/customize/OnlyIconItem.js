import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'
import NotificationsIcon from '@material-ui/icons/Notifications';


export default function OnlyIconItem(props) {
    let IconComponent = null;
    if (props.iconName)
        IconComponent = props.iconName

    return (
        <React.Fragment>
            <IconComponent className={props.className} style={props.style} onClick={props.handleClick} color="primary"/>
        </React.Fragment>
    )
}

OnlyIconItem.propTypes = {
    iconName: PropTypes.string.isRequired,
    handleClick: PropTypes.func
}