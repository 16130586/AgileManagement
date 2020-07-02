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
import {fetchAllGroup} from "../../../actions/work-space";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function GroupItem(props) {
    const row = props.row;
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

    // Dialog delete
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleDeleteMember = (userId) => {
        // TBD - Call method delete
        handleCloseDialog(false)
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
                    {row.name}
                </TableCell>
                <TableCell align="right">TBD</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
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
                                    {row.member.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.nickName}
                                            </TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell align="right">
                                                <Icon
                                                    className="cursor--pointer"
                                                    aria-controls={"lead_mor_hoz_menu".concat(row.id)}
                                                    aria-haspopup="true"
                                                    onClick={handleOpenMenu}>
                                                    more_horiz
                                                </Icon>
                                                <Menu
                                                    id={"lead_mor_hoz_menu".concat(row.id)}
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
                                                    aria-labelledby={"alert-dialog-title".concat(row.id)}
                                                    aria-describedby={"alert-dialog-description".concat(row.id)}>
                                                    <DialogTitle
                                                        id={"alert-dialog-title".concat(row.id)}>
                                                        Delete Member?
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id={"alert-dialog-description".concat(row.id)}>
                                                            Are you sure to remove this user from your Group?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() => handleDeleteMember(row.id)}
                                                            color="primary">
                                                            Delete
                                                        </Button>
                                                        <Button onClick={handleCloseDialog} color="primary" autoFocus>
                                                            Cancle
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
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
    }, [data, fetchGroup])
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
                    {data.map((row) => (
                        <GroupItem key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = state => {
    return {
        data : state.People_Group.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchGroup: () => dispatch(fetchAllGroup())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupList);



