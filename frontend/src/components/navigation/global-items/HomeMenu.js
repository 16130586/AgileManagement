import React from 'react'
import OnlyIconItem from '../../customize/OnlyIconItem'
import PropTypes from 'prop-types'
const listItemStyle = {
    display: "flex",
    alignItems: "center"
}
function HomeMenu(props) {
    let listMenuItems = null
    if (props.menuItemConfigs && props.menuItemConfigs.length > 0) {
        listMenuItems =
            <ul className="text-left list--menu">
                {props.menuItemConfigs.map((menuItem  , index )=>
                    <li key={index} 
                        className="cursor-pointer--hover"
                        style={listItemStyle}
                        onClick={() => props.actions.featureMenuClicked(menuItem)}>
                        <OnlyIconItem className="inline-block" iconName={menuItem.iconName} />
                        <span className="inline-block ml-1 pd-1">{menuItem.menuName}</span>
                    </li>
                )}
            </ul>
    }
    return (
        <div className="text-center">
            <h2>Jira Software</h2>
            {listMenuItems && listMenuItems}
        </div>
    )
}
HomeMenu.propTypes = {
    menuItemConfigs: PropTypes.arrayOf(PropTypes.shape(
        {
            menuName: PropTypes.string.isRequired,
            iconName: PropTypes.string.isRequired,
            handleClick: PropTypes.func
        }
    )).isRequired
}

export default HomeMenu