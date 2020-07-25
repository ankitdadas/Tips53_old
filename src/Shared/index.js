import { errorMessage } from './../Constants/errorMessage';
import { emailRegularExp } from './../Constants/config'
import { tr } from 'date-fns/locale';
export function checkValidity(value, name, rules) {

    let isValid = false;
    const { errorObject } = rules;
    let errorMsg = "";
    if (errorObject.isDropdown) {
        if (errorObject.required) {
            if (!value) {
                isValid = false;
                errorMsg = errorMessage[name];
            }
            else {
                isValid = true;
            }
        }
    }
    else if (errorObject.isDate) {
        if (errorObject.required) {
            const dateValue = Date.parse(value) ? new Date(value).toISOString() : null;
            if (!dateValue) {
                isValid = false;
                errorMsg = errorMessage[name];
            }
            else {
                isValid = true;
            }
        }
    }
    else {
        if (errorObject.required) {
            if (typeof value === "string")
                isValid = value.trim() !== '';
            if (typeof value === "number") {
                if (isNaN(value)) {
                    isValid = false;
                    errorMsg = `${errorMessage[`${name}Negative`]}`;
                }
                else {
                    isValid = value >= 0;
                }
            }
            if (!isValid)
                errorMsg = errorMessage[name];
        }

        if (errorObject.minLength && isValid == true) {
            isValid = value.length >= errorObject.minLength;
            console.log(isValid);
            if (!isValid)
                errorMsg = `${errorMessage[`${name}Minlength`]} ${errorObject.minLength}`;
        }
        if (errorObject.isEmail && isValid == true) {
            const patt = new RegExp(emailRegularExp);
            isValid = patt.test(value);
            if (!isValid)
                errorMsg = `${errorMessage[`${name}InValid`]}`;

        }
    }
    if (!isValid) {
        rules = {
            ...rules, errorObject: { ...errorObject, errorMessage: errorMsg, isValid }
        }
    }
    else {
        rules = {
            ...rules, errorObject: { ...errorObject, errorMessage: "", isValid }
        }
    }
    return rules;
}
export const gender = [{ id: 'Male', value: 'Male' }, { id: 'Female', value: 'Female' }] 