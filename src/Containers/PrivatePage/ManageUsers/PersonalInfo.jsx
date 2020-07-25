import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import httpService from '../../../API/HttpService/httpService';
import { API_PATH } from './../../../Constants/config';
import { Autocomplete } from '@material-ui/lab';
import { checkValidity } from './../../../Shared/index';
import NumberFormatCustom from './../../../Components/Forms/NumericInput';
import MaskInput from './../../../Components/Forms/MaskInput';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    datePicker:
    {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

export default function PersonalInfo(props) {
    const classes = useStyles();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [gender, setGender] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState(
        new Date()
    );


    const [stateObj, setError] = useState({
        error: {
            firstName: { errorObject: { required: true, errorMessage: "", isValid: true } },
            lastName: {
                errorObject: { required: true, errorMessage: "", isValid: true }
            },
            middleName: {
                errorObject: { isValid: true }
            },
            ssnNo: {
                errorObject: { required: true, isValid: true, isNumeric: true, minLength: 9, errorMessage: "" }
            }, email: {
                errorObject: { required: true, isEmail: true, errorMessage: "", isValid: true }
            },
            gender: {
                errorObject: { required: true, isValid: true, errorMessage: "", isDropdown: true }
            },
            phoneNumber: {
                errorObject: { required: true, isValid: true, isNumeric: true, errorMessage: "" }
            },
            dob: {
                errorObject: { required: true, isValid: true, isDate: true, errorMessage: "" }
            },
            homeAddress: {
                errorObject: { required: true, isValid: true, errorMessage: "" }
            },
            address1: {
                errorObject: { required: true, isValid: true, errorMessage: "" }
            },
            address2: {
                errorObject: { required: true, isValid: true, errorMessage: "" }
            },
            country: {
                errorObject: { required: true, isValid: true, errorMessage: "", isDropdown: true }
            },
            state: {
                errorObject: { required: true, isValid: true, errorMessage: "", isDropdown: true }
            },
            city: {
                errorObject: { required: true, isValid: true, errorMessage: "", isDropdown: true }
            }, zipCode: {
                errorObject: { required: true, isValid: true, isNumeric: true, minLength: 6, errorMessage: "" }
            }
        },
        account: {
            firstName: '', lastName: '',
            middleName: "", ssnNo: "", email: "",
            gender: null, phoneNumber: "", dob: new Date(), homeAddress: "",
            country: null, state: null, city: null, zipCode: "",
            address1: "", address2: ""
        }
    });
    useEffect(() => {
        httpService.all([httpService.get(API_PATH.GET_COUNTRY),
        httpService.get(API_PATH.GET_GENDER)]).then(responses => {
            const [countries, gender] = responses;
            setCountries(countries.data);
            setGender(gender.data);
        });
    }, []);
    const getStates = (countryId) => {
        httpService.get(`${API_PATH.GET_STATE}${countryId}`).then(res => {
            setStates(res.data);
        })
    }
    const getCities = (stateId) => {
        httpService.get(`${API_PATH.GET_CITY}${stateId}`).then(res => {
            setCities(res.data);
        })
    }
    const changeHandler = (e) => {
        const { value, name } = e.target;
        const { error, account } = stateObj;
        const validationObj = error[name];

        const { errorObject } = checkValidity(value, name, validationObj);
        console.log(errorObject);
        setError({ ...stateObj, error: { ...error, [name]: { errorObject } }, account: { ...account, [name]: value } });

    }
    const onDropdownChangeHandler = (cntrlName, value) => {
        const { error, account } = stateObj;
        const validationObj = error[cntrlName];
        const id = value === null ? 0 : value.id;

        const { errorObject } = checkValidity(id, cntrlName, validationObj);
        if (cntrlName === 'country') {
            getStates(id);
        }
        else if (cntrlName === 'state') {
            getCities(id);
        }

        setError({ ...stateObj, error: { ...error, [cntrlName]: { errorObject } }, account: { ...account, [cntrlName]: value } });

    }
    const onDatePickerChanged = (cntrlName, value) => {

        const { error, account } = stateObj;
        const validationObj = error[cntrlName];
        console.log(cntrlName, value, validationObj);
        const { errorObject } = checkValidity(value, cntrlName, validationObj);
        setError({ ...stateObj, error: { ...error, [cntrlName]: { errorObject } }, account: { ...account, [cntrlName]: value } });

    }
    const onSubmitHandler = () => {
        const { error, account } = stateObj;
        let result = true;
        for (let err in error) {
            const value = account[err];
            const name = err;

            const validationObj = error[name];

            const { errorObject } = checkValidity(value, name, validationObj);
            console.log(errorObject.errorMessage, name);
            if (errorObject.errorMessage.trim() !== "") {
                result = false;
            }

            error[name] = { errorObject };
        }

        setError({ account, error: error });
        console.log(result);
        if (result === true) {
            props.setPersonalInfo('panel2', account);
        }
    }
    return (

        <Grid container spacing={1}>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    error={!stateObj.error.firstName.errorObject.isValid}
                    helperText={stateObj.error.firstName.errorObject.errorMessage}
                    onChange={changeHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 50
                    }}
                    autoFocus
                />

            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="middleName"
                    label="Middle Name"
                    name="middleName"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 50
                    }}
                    onChange={changeHandler}
                />

            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 50
                    }}
                    error={!stateObj.error.lastName.errorObject.isValid}
                    helperText={stateObj.error.lastName.errorObject.errorMessage}
                    onChange={changeHandler}
                />

            </Grid>
            <Grid item xs={3}>


                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="ssnNo"
                    type="text"
                    label="SSN"
                    name="ssnNo"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    inputProps={{
                        maxLength: 9,
                    }}
                    error={!stateObj.error.ssnNo.errorObject.isValid}
                    helperText={stateObj.error.ssnNo.errorObject.errorMessage}
                    onChange={changeHandler}

                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 250
                    }}
                    error={!stateObj.error.email.errorObject.isValid}
                    helperText={stateObj.error.email.errorObject.errorMessage}
                    onChange={changeHandler}
                />

            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    value={stateObj.account.gender}

                    onChange={(event, newValue) => {
                        onDropdownChangeHandler("gender", newValue);
                    }}
                    getOptionLabel={(option) => {
                        return option.gender
                    }}
                    id="controllable-gender-demo"
                    name="gender"
                    options={gender}
                    margin="normal"
                    fullWidth
                    renderInput={(params) => {
                        return (<TextField  {...params} error={!stateObj.error.gender.errorObject.isValid}
                            helperText={stateObj.error.gender.errorObject.errorMessage} name="gender" margin="normal" inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }} fullWidth InputLabelProps={{
                                shrink: true,
                            }} label="Select Gender" variant="outlined" />)
                    }}
                />

            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="phoneNumber"
                    type="text"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputComponent: MaskInput,
                    }}
                    error={!stateObj.error.phoneNumber.errorObject.isValid}
                    helperText={stateObj.error.phoneNumber.errorObject.errorMessage}
                    onChange={changeHandler}
                />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={3}>

                    <KeyboardDatePicker
                        margin="normal"
                        inputVariant="outlined"
                        fullWidth
                        disableFuture

                        id="date-picker-dialog"
                        label="Date Of Birth"
                        format="MM/dd/yyyy"
                        value={stateObj.account.dob}
                        onChange={(event, newValue) => {
                            onDatePickerChanged("dob", newValue);
                        }}
                        error={!stateObj.error.dob.errorObject.isValid}
                        helperText={stateObj.error.dob.errorObject.errorMessage}
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="homeAddress"
                    label="Home Address"
                    name="homeAddress"
                    autoComplete="homeAddress"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 250
                    }}
                    error={!stateObj.error.homeAddress.errorObject.isValid}
                    helperText={stateObj.error.homeAddress.errorObject.errorMessage}
                    onChange={changeHandler}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="address1"
                    label="Address 1"
                    name="address1"
                    autoComplete="address1"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 250
                    }}
                    error={!stateObj.error.address1.errorObject.isValid}
                    helperText={stateObj.error.address1.errorObject.errorMessage}
                    onChange={changeHandler}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="address2"
                    label="Address 2"
                    name="address2"
                    autoComplete="address2"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={changeHandler}
                />
            </Grid>

            <Grid item xs={3}>

                <Autocomplete
                    value={stateObj.account.country}

                    onChange={(event, newValue) => {
                        onDropdownChangeHandler("country", newValue);
                    }}
                    getOptionLabel={(option) => {
                        return option.alias
                    }}
                    id="controllable-states-demo"
                    name="country"
                    options={countries}
                    margin="normal"
                    fullWidth
                    renderInput={(params) => {
                        return (<TextField  {...params} error={!stateObj.error.country.errorObject.isValid}
                            helperText={stateObj.error.country.errorObject.errorMessage} name="country" margin="normal" inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }} fullWidth InputLabelProps={{
                                shrink: true,
                            }} label="Select Country" variant="outlined" />)
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    value={stateObj.account.state}
                    onChange={(event, newValue) => {
                        onDropdownChangeHandler("state", newValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    id="controllable-states-demo"
                    name="state"
                    options={states}
                    margin="normal"
                    fullWidth
                    renderInput={(params) => {
                        return (<TextField  {...params} error={!stateObj.error.state.errorObject.isValid}
                            helperText={stateObj.error.state.errorObject.errorMessage} name="state" margin="normal" inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }} fullWidth InputLabelProps={{
                                shrink: true,
                            }} label="Select State" variant="outlined" />)
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    value={stateObj.account.city}

                    onChange={(event, newValue) => {
                        onDropdownChangeHandler("city", newValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    id="controllable-states-demo"
                    name="city"
                    options={cities}
                    margin="normal"
                    fullWidth
                    renderInput={(params) => {
                        return (<TextField  {...params} name="city" error={!stateObj.error.city.errorObject.isValid}
                            helperText={stateObj.error.city.errorObject.errorMessage} margin="normal" inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }} fullWidth InputLabelProps={{
                                shrink: true,
                            }} label="Select City" variant="outlined" />)
                    }}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="zipCode"
                    label="ZIP Code."
                    name="zipCode"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    inputProps={{
                        maxLength: 6,
                    }}
                    error={!stateObj.error.zipCode.errorObject.isValid}
                    helperText={stateObj.error.zipCode.errorObject.errorMessage}
                    onChange={changeHandler}
                />
            </Grid>
            <Grid item xs={3}>

            </Grid>
            <Grid item xs={3}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmitHandler}

                >
                    Next
            </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmitHandler}

                >
                    Reset
            </Button>
            </Grid>
        </Grid>

    );
}