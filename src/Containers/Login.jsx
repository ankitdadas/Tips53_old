import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
    render() {
        return (
            <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
        );
    }
}

export default Login;