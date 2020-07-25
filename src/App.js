import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from './Containers/Login';
import { PAGE_PATH } from './Constants/config';
import ForgotPassword from "./Containers/ForgotPassword";
import WithPrivate from "./Components/hoc/WithPrivate";
import ManageUser from './Containers/PrivatePage/Admin/ManageUser';
import ManageEmployee from './Containers/PrivatePage/Admin/ManageEmployee';
import ChangePassword from './Containers/PrivatePage/Admin/ChangePassword';

class App extends Component {
    render() {
        return (
            <div className="App">

                <div>
                    <Router>
                        <Switch>
                            <Route exact path={PAGE_PATH.login}>
                                <Login {...this.props} />
                            </Route>
                            <Route exact path={PAGE_PATH.forgotPassword}>
                                <ForgotPassword {...this.props} />
                            </Route>
                            <WithPrivate path="/manageemployee" component={ManageEmployee}>

                            </WithPrivate>
                            <WithPrivate path="/createemployee" component={ManageUser}>

                            </WithPrivate>
                            <WithPrivate path="/changepassword" component={ChangePassword}>

                            </WithPrivate>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
