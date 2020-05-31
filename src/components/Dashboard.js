import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > *': {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(1),
            width: '40vw',
            height: '100vh',
        }
    }
}))


const DashBoard = (props) => {
    const { questions } = props
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
            </Paper>
        </div>
    )
}

const mapStateToProps = ({ questions }) => {
    return ({
        questions
    })
}

export default connect(mapStateToProps)(DashBoard)