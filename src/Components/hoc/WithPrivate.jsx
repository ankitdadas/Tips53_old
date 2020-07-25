import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PrimarySearchAppBar from './../Header';


const WithPrivate = ({ component: Component, ...rest }) => {
    let history = useHistory();
    return (
        <React.Fragment>
            {/*  <Button variant="contained" color="primary" onClick={() => {
                localStorage.clear();
                history.push('/');
            }}>
                Logout
            </Button> */}

            <Route {...rest}

                render={
                    props => localStorage.getItem("userName") ?
                        <Component {...props}></Component> :
                        <PrimarySearchAppBar>
                            <Component {...props}></Component>
                        </PrimarySearchAppBar>
                }>
            </Route>
        </React.Fragment>
    );
};

export default WithPrivate;