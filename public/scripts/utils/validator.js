'use strict'

const validator = (function () {
    function validateInputString(input, lengthValidation, characterValidation, min = 0, max = 100, pattern = '') {
        let isValid = false;

        if(input.val() === ''){
            //show error
        }
        else if(lengthValidation && !validateInputLength(input.val(), min, max)){
            //show error
        } else if(characterValidation && validateInputCharacters(input.val(), pattern)){
            //show error
        } else{
            //remove errors
            isValid = true;
        }

        return isValid;
    }

    function validateInputLength(value, min, max){

    }

    function validateInputCharacters(value, pattern) {

    }

})();