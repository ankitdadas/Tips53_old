import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import PersonalInfo from '../ManageUsers/PersonalInfo';
import EmployementDetail from './../ManageUsers/EmployementDetail';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'block'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));
const ManageUser = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const [personalInfoData, setpersonalInfoData] = React.useState(null);
    const [employeeDetailData, setemployeeDetailData] = React.useState(null);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const setPersonalInfo = (panelName, objPersonalInfo) => {
        setExpanded(panelName);
        setpersonalInfoData(objPersonalInfo);
    }
    const setEmployeeDetails = (objEmployeeDetails) => {
        setemployeeDetailData(objEmployeeDetails);
    }
    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Personal Details</Typography>

                </AccordionSummary>
                <AccordionDetails>

                    <PersonalInfo setPersonalInfo={setPersonalInfo}></PersonalInfo>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Employment Details</Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <EmployementDetail setEmployeeDetails={setEmployeeDetails}></EmployementDetail>
                </AccordionDetails>
            </Accordion>

        </div >
    );
};

export default ManageUser;