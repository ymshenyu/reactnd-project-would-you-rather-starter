import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Poll from './Poll'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { authedUser } = this.props
        return (
            <Router>
                <Fragment>
                    <Route component={Nav} />
                    {authedUser === null
                        ? (
                            <div>
                                <Route path='/' component={Auth} />
                            </div>
                        ) : (
                            <div>
                                <Route path='/' exact component={Dashboard} />
                                <Route path='/questions/:id' component={Poll} />
                            </div>
                        )
                    }

                </Fragment>
            </Router>
        )
    }
}

const mapStateToProps = ({ authedUser }) => {
    return ({
        authedUser
    })
}

export default connect(mapStateToProps)(App);
