import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'


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
        }
    },
    question: {
        width: '100%'
    }
}))


const DashBoard = (props) => {
    const { users, questions, authedUser } = props
    const classes = useStyles()
    const [QuestionsType, setQuestionsType] = useState('unanswered')
    const matchQuestion = QuestionsType === 'unanswered'
        ? Object.keys(questions).filter(question => !questions[question].optionOne.votes.includes(authedUser) &&
            !questions[question].optionTwo.votes.includes(authedUser))
        : Object.keys(questions).filter(question => questions[question].optionOne.votes.includes(authedUser) ||
            questions[question].optionTwo.votes.includes(authedUser))
    const handleOnClick = (e) => {
        e.preventDefault()
        setQuestionsType(QuestionsType === 'unanswered' ? 'answered' : 'unanswered')
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
                    {matchQuestion.map((question) => (
                        <ListItem key={questions[question].id}>
                            <Paper elevation={3} className={classes.question}>
                                <Avatar src={users[questions[question].author].avatarURL}
                                    alt={`Avatar of ${questions[question].author}`} variant='square' />
                                <span>{questions[question].id}</span>
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
    questions,
    authedUser
})

export default connect(mapStateToProps)(DashBoard)