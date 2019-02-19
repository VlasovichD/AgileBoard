import React from 'react';

import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { UserPage } from '../UserPage';
import { HelpPage } from '../HelpPage';
import { AboutPage } from '../AboutPage';
import { BoardPage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, user } = this.props;
        return (
            <div className="jumbotron">
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">Agile Board</a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a href="/help">Help</a></li>
                                <li><a href="/about">About</a></li>
                            </ul>
                            {user ?
                                (<ul className="nav navbar-nav navbar-right">
                                    <li><a href="/user"><span class="glyphicon glyphicon-user"></span>Hello, {user.username}!</a></li>
                                    <li><a href="/login"><span class="glyphicon glyphicon-log-out"></span>Log Out</a></li>
                                </ul>) :
                                (<ul className="nav navbar-nav navbar-right">
                                    <li><a href="/register"><span class="glyphicon glyphicon-user"></span>Sign Up</a></li>
                                    <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span>Log In</a></li>
                                </ul>)
                            }
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={BoardPage} />
                                <Route path="/user" component={UserPage} />
                                <Route path="/about" component={AboutPage} />
                                <Route path="/help" component={HelpPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    const { user } = authentication;
    const { loggingIn } = state.authentication;
    return {
        alert,
        user, loggingIn
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 