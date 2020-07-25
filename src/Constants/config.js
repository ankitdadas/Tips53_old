export const WEB_URL = "https://material-ui.com/";
export const WEB_API_URL = "http://localhost:3000";
export const WEBSITE_NAME = 'TIPS 53';


//Page Path
export const PAGE_PATH = {
    forgotPassword: "/forgotpassword",
    login: "/"
}
//API PATH
export const API_PATH = {
    GET_COUNTRY: '/dropdown/country',
    GET_BILLING_STATUS: '/dropdown/employee?downType=GET_STATUS',
    GET_TAX_TYPE: '/dropdown/employee?downType=GET_TAX_TYPE',
    GET_WORK_AUTHORIZATION: '/dropdown/employee?downType=GET_WORK_AUTHORIZATION',
    GET_DESIGNATION: '/dropdown/employee?downType=GET_DESIGNATION',
    GET_DEPARTMENTS: '/dropdown/employee?downType=GET_DEPARTMENTS',
    GET_WAGE_CYCLE: '/dropdown/employee?downType=GET_WAGE_CYCLE',
    GET_GENDER: '/dropdown/employee?downType=GET_GENDER',
    GET_STATE: '/dropdown/state?countryId=',
    GET_CITY: '/dropdown/city?stateId=',
    GET_REPORTINGTO: '/dropdown/reportingto?organizationId=1&departmentId=',
    GET_VENDOR: 'dropdown/vendor?accountId=',
    GET_PROJECT: '/dropdown/client?vendorId='
}
export const emailRegularExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;