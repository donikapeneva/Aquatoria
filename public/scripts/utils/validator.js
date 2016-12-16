'use strict'

var validator = (function () {

    function validateInputString(input, min = 0, max = 100, pattern = '') {
        let isValid = false;

        if (input.val() === '') {
            //show error
        }
        else if (!validateInputLength(input.val(), min, max)) {
            //show error
        } else if (!validateInputCharacters(input.val(), pattern)) {
            //show error
        } else {
            //remove errors
            isValid = true;
        }
        return isValid;
    }

    function validateInputLength(value, min, max) {
        let isValid = false;

        if (value.length > min && value.length < max) {
            isValid = true;
        }

        return isValid;
    }

    function validateInputCharacters(value, pattern) {
        let isValid = false;

        if (pattern.test(value)) {
            isValid = true;
        }

        return isValid;
    }

    return {
        validateInputString,
        validateInputLength
    }
})();