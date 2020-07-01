import React, { Fragment, useState } from 'react'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
let ProjectNameComponent = function (props) {
    return (
        <td style={{ display: "flex" }}>
            <img
                style={{ width: "24px", height: "24px", borderRadius: "3px" }}
                src={props.dataItem.projectIconUrl} alt="Missing url " />
            <span className="ml-1">{props.dataItem.name}</span>
        </td>
    )
}
let LeadComponent = function (props) {
    let [anchorEl, setAnchorEl] = React.useState(null);
    let genratedId = "".concat("_").concat(props.dataItem.id)
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setAnchorEl(null);
    };

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseDialog = () => {
        setOpenDeleteDialog(false)
    }
    const handleDeleteProject = (projectId) => {
        props.deleteProject(projectId)
        handleCloseDialog(false)
    }
    return (
        <td style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <img
                    style={{ width: "24px", height: "24px" }}
                    src={props.dataItem.avatarUrl} alt="Missing url " />
                <span>{props.dataItem.lead}</span>
            </div>
            <div>
                <Icon
                    className="cursor--pointer"
                    aria-controls={"lead_mor_hoz_menu".concat(genratedId)}
                    aria-haspopup="true"
                    onClick={handleOpenMenu}>
                    more_horiz
                </Icon>
                <Menu
                    id={"lead_mor_hoz_menu".concat(genratedId)}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseOptsMenu}
                >
                    <MenuItem onClick={() => props.navigateTo(`/project/${props.dataItem.id}`)}>Project settings</MenuItem>
                    <MenuItem onClick={() => {
                        setOpenDeleteDialog(true);
                        handleCloseOptsMenu()
                    }}>Move to trash</MenuItem>
                </Menu>
                <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby={"alert-dialog-title".concat(genratedId)}
                    aria-describedby={"alert-dialog-description".concat(genratedId)}>
                    <DialogTitle
                        id={"alert-dialog-title".concat(genratedId)}>
                        Move to trash?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id={"alert-dialog-description".concat(genratedId)}>
                            The project along with its issues, components, attachments, and versions will be available in the trash for 60 days after which it will be permanently deleted.

                            Only Jira admins can restore the project from the trash.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleDeleteProject(props.dataItem.id)}
                            color="primary">
                            Delete
                    </Button>
                        <Button onClick={handleCloseDialog} color="primary" autoFocus>
                            Cancle
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </td>
    )
}
let CreateProjectForm = function (props) {
    return (
        <Fragment>
            <TextField
                name="projectName"
                value={props.createProjectForm.projectName}
                onChange={(e) => props.formChange(e)}
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
            />
            <TextField
                name="projectKey"
                value={props.createProjectForm.projectKey}
                onChange={(e) => props.formChange(e)}
                autoFocus
                margin="dense"
                label="Key"
                type="text"
                fullWidth
            />
            <TextField
                name="shortDescription"
                value={props.createProjectForm.shortDescription}
                onChange={(e) => props.formChange(e)}
                autoFocus
                margin="dense"
                label="Short description"
                type="text"
                fullWidth
            />
        </Fragment>
    )
}
let ProjectComponent = function (props) {
    const [openCreateProjectDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseCreateProjectDialog = () => {
        setOpenDeleteDialog(false)
    }
    const handleDeleteProject = (projectId) => {
        props.deleteProject(projectId)
        handleCloseCreateProjectDialog(false)
    }
    const [createProjectForm, setCreateProjectForm] = React.useState({
        projectName: '',
        projectKey: '',
        shortDescription: ''

    })
    const formChange = function (event) {
        let formData = { ...createProjectForm }
        formData[event.target.name] = event.target.value
        setCreateProjectForm(formData)
    }
    const isFormValid = function() {
        let requiredAllNoneNull = true
        Object.keys(createProjectForm).forEach(name => {
            if (createProjectForm[name] == null || createProjectForm[name] == '' || createProjectForm[name].length == 0)
                requiredAllNoneNull = false
        })
        return !requiredAllNoneNull
    }
    const handleCreateProjectSubmit = function(){
        console.log(createProjectForm)
        props.createProject(createProjectForm)
    }
    return (
        <div className="body">
            <div className="header">
                <div className="header__title">
                    Project
                </div>
                <div className="header__list-btns">
                    <button onClick={() => setOpenDeleteDialog(true)} className="btn btn--blue">
                        Create project
                    </button>
                    <Dialog
                        open={openCreateProjectDialog}
                        onClose={handleCloseCreateProjectDialog}
                        aria-labelledby="create-project-dialog-title"
                        aria-describedby="create-project-dialog-description">
                        <DialogTitle
                            id="create-project-dialog-title">
                            Create new project
                    </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="create-project-dialog-description">
                                Create new project with Kanban template : Kanban
                                Monitor work in a continuous flow for agile teams ◦ Suits teams who control work volume from a backlog
                            </DialogContentText>
                            <CreateProjectForm
                                formChange={formChange}
                                createProjectForm={createProjectForm} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                disabled={isFormValid()}
                                onClick={handleCreateProjectSubmit}
                                color="primary">
                                Create now
                    </Button>
                            <Button onClick={handleCloseCreateProjectDialog} color="primary" autoFocus>
                                Quit
                    </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className="content">
                <Grid
                    style={{ minHeight: '300px' }}
                    data={orderBy(props.data, props.sort)}
                    sortable
                    sort={props.sort}
                    onSortChange={(e) => {
                        props.setSort(e.sort)
                    }}
                >
                    <Column field="name" title="Name" cell={ProjectNameComponent} />
                    <Column field="key" title="Key" />
                    <Column field="lead" title="Lead"
                        cell={(nestedProps) =>
                            <LeadComponent {...nestedProps}
                                deleteProject={props.deleteProject}
                                navigateTo={props.navigateTo} />}
                    />
                </Grid>
            </div>
        </div>
    )
}

export default ProjectComponent