import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {addMemberToGroup, deleteGroup, fetchAllGroup, removeMemberFromGroup} from "../../../actions/work-space";
import TextField from "@material-ui/core/TextField/TextField";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

let AddMemberForm = function (props) {
    return (
        <Fragment>
            <TextField
                name="dataUser"
                value={props.addMemberForm.dataUser}
                onChange={(e) => props.formChange(e)}
                autoFocus
                margin="dense"
                label="Enter..."
                type="text"
                fullWidth
            />
        </Fragment>
    )
}

function GroupItem(props) {
    const group = props.group;
    const classes = useRowStyles();

    const [openMember, setOpenMember] = React.useState(false);
    // Action
    let [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setAnchorEl(null);
    };

    // Dialog remove member
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleRemoveMember = (groupId, userId) => {
        props.removeMember(groupId, userId)
        handleCloseDialog(false)
    }

    // Dialog Delete Group
    const [openDeleteGroupDialog, setOpenDeleteGroupDialog] = React.useState(false)
    const handleCloseDeleteGroupDialog = () => {
        setOpenDeleteGroupDialog(false)
    }

    const handleDeleteGroup = (groupId) => {
        props.deleteGroup(groupId)
        handleCloseDeleteGroupDialog(false)
    }

    // Menu Group
    const [openMenuGroup, setOpenMenuGroup] = React.useState(null);
    const handleOpenMenuGroup = (event) => {
        setOpenMenuGroup(event.currentTarget);
    }
    const handleCloseMenuGroup = () => {
        setOpenMenuGroup(null);
    }

    // Add member group
    const [addMemberForm, setAddMemberForm] = React.useState({
        groupId: '',
        dataUser: ''
    })

    const handleAddMember = (groupId) => {
        props.addMember({...addMemberForm, groupId: groupId})
        handleCloseAddMemberDialog(false)
    }

    const formChange = function (event) {
        let formData = { ...addMemberForm }
        formData[event.target.name] = event.target.value
        setAddMemberForm(formData)
    }

    const [openAddMemberDialog, setOpenAddMemberDialog] = React.useState(false)
    const handleCloseAddMemberDialog = () => {
        setOpenAddMemberDialog(false)
    }


    return (
        <Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpenMember(!openMember)}>
                        {openMember ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {group.name}
                </TableCell>
                {props.me.id == group.owner.id &&
                <TableCell align="right">
                    <Icon
                    className="cursor--pointer"
                    aria-controls={"lead_mor_hoz_menu".concat("group"+group.id)}
                    aria-haspopup="true"
                    onClick={handleOpenMenuGroup}>
                    more_horiz
                </Icon>
                    <Menu
                        id={"lead_mor_hoz_menu".concat("group"+group.id)}
                        anchorEl={openMenuGroup}
                        keepMounted
                        open={Boolean(openMenuGroup)}
                        onClose={handleCloseMenuGroup}
                    >
                        <MenuItem onClick={() => {
                            setOpenDeleteGroupDialog(true);
                            handleCloseMenuGroup()
                        }}>Delete</MenuItem>
                        <MenuItem onClick={() => {
                            setOpenAddMemberDialog(true);
                            handleCloseMenuGroup()
                        }}>Add Member</MenuItem>
                    </Menu>
                    <Dialog
                    open={openAddMemberDialog}
                    onClose={handleCloseAddMemberDialog}
                    aria-labelledby={"alert-dialog-title".concat("group"+group.id)}
                    aria-describedby={"alert-dialog-description".concat("group"+group.id)}>
                    <DialogTitle
                        id={"alert-dialog-title".concat("group"+group.id)}>
                        Add Member
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id={"alert-dialog-description".concat("group"+group.id)}>
                            Enter Email or NickName to add them to group!
                        </DialogContentText>
                        <AddMemberForm formChange={formChange} addMemberForm={addMemberForm}/>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleAddMember(group.id)}
                            color="primary">
                            Add
                        </Button>
                        <Button onClick={handleCloseAddMemberDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                    <Dialog
                        open={openDeleteGroupDialog}
                        onClose={handleCloseDeleteGroupDialog}
                        aria-labelledby={"alert-dialog-title".concat("delete-group"+group.id)}
                        aria-describedby={"alert-dialog-description".concat("delete-group"+group.id)}>
                        <DialogTitle
                            id={"alert-dialog-title".concat("delete-group"+group.id)}>
                            Delete
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id={"alert-dialog-description".concat("group"+group.id)}>
                                Are you sure to delete this group?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => handleDeleteGroup(group.id)}
                                color="primary">
                                Delete
                            </Button>
                            <Button onClick={handleCloseDeleteGroupDialog} color="primary" autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "rgb(223 223 223)" }} colSpan={3}>
                    <Collapse in={openMember} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Member
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nick Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {group.member.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell component="th" scope="row">
                                                {user.nickName}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            {props.me.id == group.owner.id &&
                                            <TableCell align="right">
                                                <Icon
                                                    className="cursor--pointer"
                                                    aria-controls={"lead_mor_hoz_menu".concat(user.id)}
                                                    aria-haspopup="true"
                                                    onClick={handleOpenMenu}>
                                                    more_horiz
                                                </Icon>
                                                <Menu
                                                    id={"lead_mor_hoz_menu".concat(user.id)}
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleCloseOptsMenu}
                                                >
                                                    <MenuItem onClick={() => {
                                                        setOpenDeleteDialog(true);
                                                        handleCloseOptsMenu()
                                                    }}>Remove</MenuItem>
                                                </Menu>
                                                <Dialog
                                                    open={openDeleteDialog}
                                                    onClose={handleCloseDialog}
                                                    aria-labelledby={"alert-dialog-title".concat(user.id)}
                                                    aria-describedby={"alert-dialog-description".concat(user.id)}>
                                                    <DialogTitle
                                                        id={"alert-dialog-title".concat(user.id)}>
                                                        Delete Member?
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText
                                                            id={"alert-dialog-description".concat(user.id)}>
                                                            Are you sure to remove this user from your Group?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() => handleRemoveMember(group.id, user.id)}
                                                            color="primary">
                                                            Remove
                                                        </Button>
                                                        <Button onClick={handleCloseDialog} color="primary" autoFocus>
                                                            Cancel
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

let MyGroupList = function (props) {
    const data = props.data;
    const fetchGroup = props.fetchGroup;
    useEffect(() => {
        fetchGroup()
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((group) => (
                        <GroupItem
                            key={group.id}
                            group={group}
                            ownerId={group.owner.id}
                            me={props.me}
                            addMember={props.addMember}
                            removeMember={props.removeMember}
                            deleteGroup={props.deleteGroup}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = state => {
    return {
        data : state.People_Group,
        me : state.Common.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchGroup: () => dispatch(fetchAllGroup()),
        addMember: (data) => dispatch(addMemberToGroup(data)),
        removeMember: (groupId, userId) => dispatch(removeMemberFromGroup(groupId, userId)),
        deleteGroup: (groupId) => dispatch(deleteGroup(groupId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupList);



