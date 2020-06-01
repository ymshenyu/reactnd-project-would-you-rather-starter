import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import { handleSaveQuestion } from '../actions/shared'


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
            padding: '20px',
            '@media (max-width:1024px)': {
                width: '100vw'
            },
        }
    },
    text: {
        width: '100%'
    },
}))


const NewPoll = (props) => {
    const { authedUser, history, dispatch } = props
    const classes = useStyles()
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const handleOnChange = (e, setOption) => {
        e.preventDefault()
        setOption(e.target.value)
    }
    let newPoll = {
        author: authedUser,
        optionOneText: optionOne,
        optionTwoText: optionTwo
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(handleSaveQuestion(newPoll))
        history.push('/')
    }
    return (
        <div className={classes.root}>
            <Paper elevation={3} >
                <Grid container direction='column'>
                    <Typography variant='h4' color='primary' align='center'>Create New Question</Typography>
                    <Typography variant='h5'>Complete the question:</Typography>
                    <Typography variant='h6'>Would you rather ...</Typography>
                    <Divider />
                    <div>
                        <TextField label="Enter Option One Text Here" variant="outlined"
                            className={classes.text} onChange={(e) => handleOnChange(e, setOptionOne)} />
                        <Typography variant='subtitle1' color='primary' align='center'>Or</Typography>
                        <TextField label="Enter Option Two Text Here" variant="outlined"
                            className={classes.text} onChange={(e) => handleOnChange(e, setOptionTwo)} />
                        <Button variant="contained" color="primary"
                            fullWidth={true} style={{ marginTop: '20px' }}
                            disabled={!optionOne || !optionTwo}
                            onClick={handleOnSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Paper>
        </div>
    )
}

const mapStateToProps = ({ users, questions, authedUser }) => ({
    users,
    questions,
    authedUser
})

export default connect(mapStateToProps)(NewPoll)