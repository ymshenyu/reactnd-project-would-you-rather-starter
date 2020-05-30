import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Auth from './Auth'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { authedUser } = this.props
        return (
            <div>
                <Nav />
                {authedUser === null && (
                    <Auth />
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser }) => {
    return ({
        authedUser
    })
}

export default connect(mapStateToProps)(App);
