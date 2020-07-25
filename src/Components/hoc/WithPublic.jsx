import React from 'react';
import { Avatar, Container, Typography, CssBaseline, Checkbox, Grid, Link as MatLink, Box } from '@material-ui/core';
import { LockOutlined, LockIcon, InputOutlined } from '@material-ui/icons';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Copyright from './../Copyright';
import { Link } from 'react-router-dom';
import { PAGE_PATH } from './../../Constants/config';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
}));
const WithPublic = (props) => {
    const classes = useStyles();
    const { heading, pageLink, pageName, subTitle } = props;
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {pageLink === PAGE_PATH.forgotPassword ? <InputOutlined /> : <LockOutlined />}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {heading}
                </Typography>
                {subTitle &&
                    <Typography component="h3" variant="subtitle1">
                        {subTitle}
                    </Typography>
                }
                {props.children}
                <Grid container>
                    <Grid item xs>
                        <Link to={pageLink}>{pageName}</Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>);
};

export default WithPublic;