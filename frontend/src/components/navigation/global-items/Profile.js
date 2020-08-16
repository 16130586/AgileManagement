import React, { useState } from 'react'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
let ProfileMenu = function (props) {
    let [anchorEl, setAnchorEl] = React.useState(null)
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Icon
                className="list-item cursor-pointer--hoverr pd-1"
                aria-controls="profile-settings-menu"
                aria-haspopup="true"
                onClick={(e) => { e.stopPropagation(); handleOpenMenu(e) }}>
                person
        </Icon>
            <Menu
                id="profile-settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseOptsMenu}
            >
                <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu(); }}>Profile</MenuItem>
                <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>Account</MenuItem>
                <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu(); props.logout() }}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default ProfileMenu