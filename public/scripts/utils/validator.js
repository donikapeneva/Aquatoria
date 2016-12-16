'use strict'

var validator = (function () {

    function validateInputString(input, min = 0, max = 100, pattern = '') {
            // console.log('validateInputCharacters ' + validateInputCharacters(input.val(), pattern));

        let isValid = false;

        if (input.val() === '') {
            //show error
        }
        else if (!validateInputLength(input.val(), min, max)) {
            //show error
        } else if (!validateInputCharacters(input.val(), pattern)) {
            console.log('validateInputCharacters ');
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

        // console.log(value.match(pattern) + " chars test");
        if (pattern.test(value)) {
            isValid = true;
        }

        console.log(isValid + " chars isValid");
        return isValid;
    }

    return {
        validateInputString,
        validateInputLength
    }
})();