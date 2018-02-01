import React, { Component } from 'react';
import { Route, browserHistory, Router } from 'react-router';
import Signin from './container/signin';
import Signup from './container/signup';
import Home from './container/home';
import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory();
class RouterNav extends Component {
    render() {
        return (

            <Router history={browserHistory} >
                <Route path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />

            </Router>

        )
    }
}

export default RouterNav;