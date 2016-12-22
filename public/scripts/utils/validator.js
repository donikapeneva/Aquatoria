'use strict'

var validator = (function () {

    function validateInputString(input, min = 0, max = 100, pattern = '') {
        let isValid = false;

        if (input.val() === '') {
            //show error
        }
        else if (!validateInputLength(input, min, max)) {
            //show error
        } else if (!validateInputByPattern(input, pattern)) {
            //show error
        } else {
            //remove errors
            isValid = true;
        }
        return isValid;
    }

    function validateInputLength(input, min, max) {
        let isValid = false;

        if (input.val().length > min && input.val().length < max) {
            isValid = true;
        }

        return isValid;
    }

    function validateInputByPattern(input, pattern) {
        let isValid = false;

        if (pattern.test(input.val())) {
            isValid = true;
        }

        return isValid;
    }

    return {
        validateInputString,
        validateInputLength,
        validateInputByPattern
    }
})();