'use strict'

const util = require('util');

module.exports = function () {
    return {
        errorHelper(err) {

            let errors = [],
                messages = {
                    'required': '%s is required',
                    'min': '%s below minimum',
                    'max': '%s above maximum',
                    'enum': '%s not allowed value',
                    'unique': 'already exist a user with the same %s',
                    'invalid': '%s is invalid'
                };

            // MongoError message for unique validation
            //"E11000 duplicate key error collection: events-db.users index: email_1 dup key: { : \"asd@asd.asd\" }"
            if (err.name === 'MongoError' && err.message.indexOf('duplicate key') !== -1) {

                console.log('err name is mongo error');

                // extracting the field that caused the error
                let msg = err.message,
                    findWrongFieldNamePattern = 'index: ',
                    indexOfFieldName = msg.indexOf(findWrongFieldNamePattern),
                    secondPartMsg = msg.substring(indexOfFieldName + findWrongFieldNamePattern.length, msg.length - 1),
                    fieldName = secondPartMsg.substring(0, secondPartMsg.indexOf('_'));

                errors.push(util.format(
                    messages['unique'],
                    fieldName)
                );

                return errors;
            }

            if (err.name !== 'ValidationError') {
                return err;
            }


            Object.keys(err.errors).forEach(function (field) {
                let eObj = err.errors[field];

                if (!messages.hasOwnProperty(eObj.properties.type)) {
                    errors.push(util.format(
                        messages['invalid'],
                        eObj.properties.path)
                    )
                } else {
                    errors.push(util.format(
                        messages[eObj.properties.type],
                        eObj.properties.path)
                    );
                }
            });

            return errors;
        }
    }
}
