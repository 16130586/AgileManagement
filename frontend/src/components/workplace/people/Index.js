import React, { Fragment, useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

let CreateGroupForm = function (props) {
    return (
        <Fragment>
            <TextField
                name="groupName"
                value={props.createGroupForm.groupName}
                onChange={(e) => props.formChange(e)}
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
            />
        </Fragment>
    )
}

let IndexPeople = function (props) {
    let [currentTab, setCurrentTab] = useState(Object.keys(props.tabs)[0])
    let TabComponent = props.tabs[currentTab]

    const [openCreateGroupDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseCreateGroupDialog = () => {
        setOpenDeleteDialog(false)
    }

    const [createGroupForm, setCreateGroupForm] = React.useState({
        groupName: ''
    })

    const formChange = function (event) {
        let formData = { ...createGroupForm }
        formData[event.target.name] = event.target.value
        setCreateGroupForm(formData)
    }

    const isFormValid = function() {
        let requiredAllNoneNull = true
        Object.keys(createGroupForm).forEach(name => {
            if (createGroupForm[name] == null || createGroupForm[name] == '' || createGroupForm[name].length == 0)
                requiredAllNoneNull = false
        })
        return !requiredAllNoneNull
    }

    const handleCreateGroupSubmit = function(){
        props.createProject(createGroupForm)
    }

    return(
        <div className="body">
            <div className="header">
                <div className="header__title">
                    People
                </div>
                <div className="header__list-btns">
                    <button onClick={() => setOpenDeleteDialog(true)} className="btn btn--blue">
                        Create Group
                    </button>
                    <Dialog
                        open={openCreateGroupDialog}
                        onClose={handleCloseCreateGroupDialog}
                        aria-labelledby="create-group-dialog-title"
                        aria-describedby="create-group-dialog-description">
                        <DialogTitle
                            id="create-group-dialog-title">
                            Create new group
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="create-group-dialog-description">
                            </DialogContentText>
                            <CreateGroupForm formChange={formChange} createGroupForm={createGroupForm} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                disabled={isFormValid()}
                                onClick={handleCreateGroupSubmit}
                                color="primary">
                                Create now
                            </Button>
                            <Button onClick={handleCloseCreateGroupDialog} color="primary" autoFocus>Quit</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className="content">
                <div className="tab-header">
                    <div className="tab-header_item"
                         onClick={() => setCurrentTab('0')}>
                        <span>My Group</span>
                        {'0' === currentTab &&
                        <span className="tab-header__selected"></span>
                        }
                    </div>
                </div>
                <span className="tab-spliter"></span>
                <div className="tab-data">
                    {TabComponent && <TabComponent props={{...props}}/>}
                </div>
            </div>
        </div>
    )
}

export default IndexPeople;
