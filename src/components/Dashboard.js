import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


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
                width: '100vw',
                height: '100vh'
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
    }
}))


const DashBoard = (props) => {
    const { users, questions, authedUser, history } = props
    const classes = useStyles()
    const [QuestionsType, setQuestionsType] = useState('unanswered')
    const matchQuestions = QuestionsType === 'unanswered'
        ? questions.filter(question => !users[authedUser].answers.hasOwnProperty(question.id))
        : questions.filter(question => users[authedUser].answers.hasOwnProperty(question.id))
    const handleOnClick = (e) => {
        e.preventDefault()
        setQuestionsType(QuestionsType === 'unanswered' ? 'answered' : 'unanswered')
    }
    const toPoll = (e, id) => {
        e.preventDefault()
        history.push(`/questions/${id}`)
    }
    return (
        <div className={classes.root}>
            <Paper elevation={3} >
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"
                    fullWidth={true}>
                    <Button disabled={QuestionsType === 'unanswered'} onClick={handleOnClick}>Unanswered Questions</Button>
                    <Button disabled={QuestionsType === 'answered'} onClick={handleOnClick}>answered Questions</Button>
                </ButtonGroup>
                <List>
                    {matchQuestions.map((question) => (
                        <ListItem key={question.id}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Avatar src={users[question.author].avatarURL}
                                            alt={`Avatar of ${question.author}`} variant='square'
                                            className={classes.avatar}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {users[question.author].name} asks:
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Would you rather
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    ...{question.optionOne.text}...
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" style={{ marginBottom: '10px' }}>
                                                    <Button variant="contained" color="primary" onClick={(e) => toPoll(e, question.id)}>
                                                        View Poll
                                                    </Button>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}

const mapStateToProps = ({ users, questions, authedUser }) => ({
    users,
    questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
    authedUser
})

export default connect(mapStateToProps)(DashBoard)