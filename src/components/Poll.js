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
    }
}))


const Poll = (props) => {
    const { users, question, authedUser } = props
    const classes = useStyles()
    const [value, setValue] = React.useState(question.optionOne.text)
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <div className={classes.root}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar src={users[authedUser].avatarURL}
                            alt={`Avatar of ${question.author}`} variant='square'
                            className={classes.avatar}
                        />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {users[authedUser].name} asks:
                                </Typography>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Would You Rather ...</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        <FormControlLabel value={question.optionOne.text} control={<Radio />} label={question.optionOne.text} />
                                        <FormControlLabel value={question.optionTwo.text} control={<Radio />} label={question.optionTwo.text} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ marginBottom: '10px' }}>
                                    <Button variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

const mapStateToProps = ({ users, questions, authedUser }, { match }) => ({
    users,
    question: questions[match.params.id],
    authedUser
})

export default connect(mapStateToProps)(Poll)