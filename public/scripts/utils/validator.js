'use strict'


const validator = (function () {
    console.log("Vlizam v validator");
    /*
    function validateInputString(input, lengthValidation, characterValidation, min = 0, max = 100, pattern = '') {
        let isValid = false;

        if (input.val() === '') {
            //show error
        }
        else if (lengthValidation && !validateInputLength(input.val(), min, max)) {
            //show error
        } else if (characterValidation && validateInputCharacters(input.val(), pattern)) {
            //show error
        } else {
            //remove errors
            isValid = true;
        }

        return isValid;
    }
    */
/*
    function validateInputLength(value, min, max) {
        let isValid = true;

        if (value.length < min || value > max) {
            isValid = false;
        }

        return isValid;
    }
*/
    function validateInputCharacters(value, pattern) {
        let isValid = false;

        if (!pattern.test(value)) {
            isValid = true;
        }

        return isValid;
    }

    return {
        validateInputString(input, lengthValidation, characterValidation, min = 0, max = 100, pattern = '') {
            let isValid = false;

            if (input.val() === '') {
                //show error
            }
            else if (lengthValidation && !validateInputLength(input.val(), min, max)) {
                //show error
            } else if (characterValidation && validateInputCharacters(input.val(), pattern)) {
                //show error
            } else {
                //remove errors
                isValid = true;
            }

            return isValid;
        },
        validateInputLength(value, min, max) {
            let isValid = true;

            if (value.length < min || value > max) {
                isValid = false;
            }

            return isValid;
        }
    }
})();