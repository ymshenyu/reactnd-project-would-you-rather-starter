import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

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
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    const { authedUser } = props
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant='contained' color="secondary" className={classes.menuButton}>Home</Button>
                    <Button variant='contained' color="secondary" className={classes.menuButton}>New Question</Button>
                    <Button variant='contained' color="secondary" className={classes.menuButton}>Leader Board</Button>
                    <Typography className={classes.title}></Typography>
                    {authedUser !== null
                        ? <Button variant='contained' color="secondary">Logout</Button>
                        : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = ({ authedUser }) => {
    return ({
        authedUser
    })
}

export default connect(mapStateToProps)(ButtonAppBar)