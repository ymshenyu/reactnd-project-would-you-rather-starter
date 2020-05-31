import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Auth from './Auth'
import Dashboard from './Dashboard'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { authedUser } = this.props
        return (
            <Fragment>
                <Nav />
                {authedUser === null
                    ? <Auth />
                    : <Dashboard />}
            </Fragment>
        )
    }
}

const mapStateToProps = ({ authedUser }) => {
    return ({
        authedUser
    })
}

export default connect(mapStateToProps)(App);
