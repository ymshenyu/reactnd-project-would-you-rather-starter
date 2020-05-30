import React from 'react'
import { connect } from 'react-redux'

const Auth = (props) => {
    const { users } = props
    return (
        <ul>
            {Object.keys(users).map(user => (
                <li key={users[user].id}>
                    {users[user].name}
                </li>
            ))}
        </ul>
    )
}

const mapStateToProps = ({ users }) => {
    return ({
        users
    })
}

export default connect(mapStateToProps)(Auth)