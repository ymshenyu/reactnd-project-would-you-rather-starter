import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Avatar from '@material-ui/core/Avatar'

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
    }
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    const { authedUser, users } = props
    const handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = props
        dispatch(setAuthedUser(null))
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant='contained' color="secondary" className={classes.menuButton}>Home</Button>
                    <Button variant='contained' color="secondary" className={classes.menuButton}>New Question</Button>
                    <Button variant='contained' color="secondary" className={classes.menuButton}>Leader Board</Button>
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
                    {authedUser !== null
                        ? <Button variant='contained' color="secondary" onClick={handleLogout}>Logout</Button>
                        : null}
                </Toolbar>
            </AppBar>
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