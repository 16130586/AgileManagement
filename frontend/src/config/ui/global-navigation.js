import HomeMenu from '../../components/navigation/global-items/HomeMenu'
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
const menuType = {
    TOP: "TOP",
    BOTTOM: "BOTTOM"
}
const createMenuItemConfig = function (name, type, componentType, materialUiIconName, isDefault) {
    return {
        name,
        componentType,
        type,
        iconName: materialUiIconName,
        isDefault
    }
}

const globalMenuItems = [
    createMenuItemConfig("HOME", menuType.TOP, HomeMenu, HomeIcon, true),
    createMenuItemConfig("SEARCH", menuType.TOP , "m2", SearchIcon),
    createMenuItemConfig("CREATE-NEW-PROJECT", menuType.TOP, "m3", AddIcon),
    createMenuItemConfig("NOTIFICATION", menuType.BOTTOM , "m4", NotificationsIcon),
    createMenuItemConfig("HELP", menuType.BOTTOM , "m5", HelpIcon),
    createMenuItemConfig("SETTING", menuType.BOTTOM , "m6", SettingsIcon),
    createMenuItemConfig("PROFILE-AND-SETTINGS", menuType.BOTTOM , "m7", PersonIcon)
]
export default globalMenuItems