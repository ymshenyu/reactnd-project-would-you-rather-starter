import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Home from '@material-ui/icons/Home'
import Add from '@material-ui/icons/Add'
import BarChart from '@material-ui/icons/BarChart'
import ExitToApp from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    space: {
        marginRight: theme.spacing(2)
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: 250,
    },
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    const { authedUser, users } = props
    const [openDrawer, setDrawer] = useState(false)
    const handleDrawer = (e) => {
        e.preventDefault()
        setDrawer(!openDrawer)
    }
    const handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = props
        dispatch(setAuthedUser(null))
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title}></Typography>
                    {authedUser !== null
                        ?
                        <div className={classes.center}>
                            <Avatar className={classes.space} alt={users[authedUser].name} src={users[authedUser].avatarURL} />
                            <Typography variant='h6' className={classes.space}>
                                {users[authedUser].name}
                            </Typography>
                        </div>
                        : null}
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={openDrawer} onClose={handleDrawer}>
                <div className={classes.list}>
                    <List>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Add /></ListItemIcon>
                            <ListItemText primary='New Question' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><BarChart /></ListItemIcon>
                            <ListItemText primary='Leader Board' />
                        </ListItem>
                        <Divider />
                        {authedUser !== null
                            ?
                            <ListItem button onClick={handleLogout}>
                                <ListItemIcon><ExitToApp /></ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItem>
                            : null}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

const mapStateToProps = ({ users, authedUser }) => {
    return ({
        users,
        authedUser
    })
}

export default connect(mapStateToProps)(ButtonAppBar)