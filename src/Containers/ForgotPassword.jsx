import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import WithPublic from './../Components/hoc/WithPublic';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { PAGE_PATH } from './../Constants/config';
import { checkValidity } from './../Shared/index';
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const ForgotPassword = () => {
    const classes = useStyles();
    const [isBtnDisabled, setButtonDisabled] = useState(false);
    const [stateObj, setError] = useState({
        error: {
            email: { errorObject: { required: true, errorMessage: "", isValid: true } },
            userName: {
                errorObject: { required: true, errorMessage: "", minLength: 8, isValid: true }
            }
        },
        account: { email: '', userName: '' }
    });

    useEffect(() => {
        const { error, account } = stateObj;
        let isValid = true;
        for (let er in error) {
            const errorObj = error[er];
            for (let obj in errorObj) {
                let errorObjbect = errorObj[obj];
                if (errorObjbect.isValid === false || account[er].trim() === '') {
                    isValid = false;
                    break;
                }
            }
        }
        setButtonDisabled(isValid);

    }, [stateObj])
    const changeHandler = (e) => {
        const { value, name } = e.target;
        const { error, account } = stateObj;
        const validationObj = error[name];

        const { errorObject } = checkValidity(value, name, validationObj);

        setError({ ...stateObj, error: { ...error, [name]: { errorObject } }, account: { ...account, [name]: value } });

    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <WithPublic heading={"Forgot Password"}
            pageLink={PAGE_PATH.login}
            subTitle={"Email will be sent on your Email ID to reset password"}
            pageName="Return to Log in">
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    error={!stateObj.error.email.errorObject.isValid}
                    margin="normal"
                    helperText={stateObj.error.email.errorObject.errorMessage}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={changeHandler}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    error={!stateObj.error.userName.errorObject.isValid}
                    helperText={stateObj.error.userName.errorObject.errorMessage}
                    fullWidth
                    name="userName"
                    label="User name"
                    type="text"
                    id="userName"
                    onChange={changeHandler}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmitHandler}
                    disabled={!isBtnDisabled}
                >
                    Submit
            </Button>
            </form>
        </WithPublic>
    );
};

export default ForgotPassword;