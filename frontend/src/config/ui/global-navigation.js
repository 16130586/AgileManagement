import HomeMenu from '../../components/navigation/global-items/HomeMenu'
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ProfileMenu from '../../containers/global-nav-items/ProfileContainer'
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
    createMenuItemConfig("HOME", menuType.TOP, null, HomeIcon, true),
    createMenuItemConfig("SEARCH", menuType.TOP ,null, SearchIcon , false),
    createMenuItemConfig("CREATE-NEW-PROJECT", menuType.TOP, null, AddIcon, false),
    createMenuItemConfig("NOTIFICATION", menuType.BOTTOM , null, NotificationsIcon, false),
    createMenuItemConfig("HELP", menuType.BOTTOM , null, HelpIcon, false),
    createMenuItemConfig("SETTING", menuType.BOTTOM , null, SettingsIcon, false),
    createMenuItemConfig("PROFILE-AND-SETTINGS", menuType.BOTTOM , ProfileMenu, PersonIcon,false)
]
export default globalMenuItems