import React from 'react'
import GlobalNavigation from '../components/navigation/GlobalNavigation'
import globalItemsConfig from '../config/ui/global-navigation'

function GlobalNavigationContainer(props) {
    globalItemsConfig.forEach(config => {
        config.handleClick = (e) => (console.log(e))
    })
    return (
        <GlobalNavigation {...props} items={globalItemsConfig} />
    )
}

export default GlobalNavigationContainer