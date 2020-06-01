import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        alignItems: 'center'
}
}))

const LeaderBoard = (props) => {
    const { users } = props
    const classes = useStyles()
    function createData(name, answered, created, avatar) {
        return { name, answered, created, score: answered + created, avatar };
    }
    const rows = users.map(user => createData(user.name, Object.keys(user['answers']).length, user.questions.length, user.avatarURL))
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell align="right">Answered questions</TableCell>
                        <TableCell align="right">Created questions</TableCell>
                        <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row" className={classes.center}>
                                <Avatar src={row.avatar}
                                    alt={`Avatar of ${row.name}`}
                                />
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.answered}</TableCell>
                            <TableCell align="right">{row.created}</TableCell>
                            <TableCell align="right">{row.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const mapStateToProps = ({ users }) => ({
    users: Object.entries(users).map(([key, value]) => value)
        .sort((a, b) => (b.questions.length + Object.keys(b['answers']).length) - (a.questions.length + Object.keys(a['answers']).length)),
})

export default connect(mapStateToProps)(LeaderBoard)