import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import logo from '../logo/react.svg'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: '40vw',
            height: '60vh',
        }
    }
}))


const Auth = (props) => {
    const { users } = props
    const classes = useStyles()
    const [value, setValue] = useState('')
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <Paper elevation={3} style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                    <h2 style={{ marginTop: '0px' }}>Welcome to the Would You Rather App</h2>
                    <h3 style={{ marginTop: '0px' }}>Please sign in to continue</h3>
                </Paper>
                <img src={logo} alt='logo' style={{ height: '60%', display: 'block', margin: '0 auto' }} />
                <div>
                    <Select value={value} onChange={(e) => setValue(e.target.value)} style={{ width: '100%' }}>
                        {Object.keys(users).map(user => (
                            <MenuItem key={users[user].id} value={users[user].id}>
                                {users[user].name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant='contained' color="primary" style={{ marginTop: '40px', width: '100%' }}>Login</Button>
                </div>
            </Paper>
        </div>
    )
}

const mapStateToProps = ({ users }) => {
    return ({
        users
    })
}

export default connect(mapStateToProps)(Auth)