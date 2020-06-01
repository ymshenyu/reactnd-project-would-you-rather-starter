import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { handleSaveAnswer } from '../actions/shared'
import LinearProgress from '@material-ui/core/LinearProgress'
import MuiAlert from '@material-ui/lab/Alert'


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
            '@media (max-width:1024px)': {
                width: '100vw'
            },
        }
    },
    question: {
        width: '100%'
    },
    avatar: {
        height: '128px',
        width: '128px'
    },
    paper: {
        width: '100%'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))


const Poll = (props) => {
    const { users, question, authedUser, dispatch } = props
    const classes = useStyles()
    const [answer, setAnswer] = useState('optionOne')
    const percentage = (option) => {
        const total = question.optionOne.votes.length + question.optionTwo.votes.length
        const obtained = question[option].votes.length
        return obtained * 100 / total
    }
    const handleChange = (event) => {
        setAnswer(event.target.value)
    }
    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(handleSaveAnswer(question.id, answer))
    }
    if (question === null) {
        return (
            <Typography gutterBottom variant="h2" style={{ textAlign: 'center' }}>
                This Question doesn't exist
            </Typography>
        )
    }
    const isAnswered = users[authedUser].answers.hasOwnProperty(question.id)
    return (
        <div className={classes.root}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item className={classes.center}>
                        <Paper elevation={3}>
                            <Avatar src={users[authedUser].avatarURL}
                                alt={`Avatar of ${question.author}`} variant='square'
                                className={classes.avatar}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {users[authedUser].name} asks:
                                </Typography>
                                {isAnswered
                                    ? (
                                        <div>
                                            <Typography gutterBottom variant="h3">
                                                Results:
                                            </Typography>
                                            {['optionOne', 'optionTwo'].map(option => (
                                                <Paper key={option} elevation={3}>
                                                    {option === answer &&
                                                        <MuiAlert elevation={6} variant="filled" severity="success">
                                                            Your vote
                                                        </MuiAlert>}
                                                    <h3>Would you rather {question[option].text}?</h3>
                                                    <Typography gutterBottom variant="subtitle1" style={{ textAlign: 'center' }}>
                                                        {Math.ceil(percentage(option))}%
                                                    </Typography>
                                                    <LinearProgress variant='determinate' value={percentage(option)} />
                                                    <Typography gutterBottom variant="subtitle1" style={{ textAlign: 'center' }}>
                                                        {question[option].votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
                                                    </Typography>
                                                </Paper>
                                            ))}
                                        </div>
                                    ) : (
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Would You Rather ...</FormLabel>
                                            <RadioGroup aria-label="Would You Rather" name="Would You Rather" value={answer} onChange={handleChange}>
                                                {['optionOne', 'optionTwo'].map(option => (
                                                    <FormControlLabel value={option} control={<Radio />}
                                                        label={question[option].text} key={option} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    )
                                }
                            </Grid>
                            {isAnswered
                                ? (
                                    null
                                ) : (
                                    <Grid item>
                                        <Typography variant="body2" style={{ marginBottom: '10px' }}>
                                            <Button variant="contained" color="primary" onClick={handleOnClick}>
                                                Submit
                                            </Button>
                                        </Typography>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

const mapStateToProps = ({ users, questions, authedUser }, { match }) => ({
    users,
    question: questions[match.params.id] ? questions[match.params.id] : null,
    authedUser
})

export default connect(mapStateToProps)(Poll)