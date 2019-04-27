module.exports = {
    /**
     * validates that req.body has specified
     * required fields 
     * @param {*} requiredFields 
     * @param {*} reqBody 
     * @returns array Errors
     */
    hasRequiredFields: function(requiredFields, reqBody)
    {
        // TODO: change to log if either of the 
        // arguments is undefined. there is no reason
        // to show these errors to the end user.
        let errors = [];
        if (typeof requiredFields == 'undefined' ||
        typeof reqBody == 'undefined')
        {
            return null;
        }

        for (let prop in reqBody)
        {
            if (!requiredFields.hasOwnProperty(prop))
            {
                // if we get here the property is not required.
                continue;
            }

            if (reqBody[prop].trim().length <= 0)
            {
                errors.push({
                    message: `${requiredFields[prop]} cannot be empty.`
                });
            }
        }

        return errors;
    },

    /**
     * Creates an object to return valid POST data to return
     * to the frontend when a request fails validation
     * (If you read this send me an emoji lol)
     * @param {*} reqBody 
     * @param {*} propsArray 
     * @returns Object badUser -_- (yes this is a frowny face)
     */
    createBadUser: function(reqBody, propsArray)
    {
        if (typeof reqBody == 'undefined'
        || typeof propsArray == 'undefined')
        {
            // if we get here we have bad data
            return null;
        }

        let badUser = {};

        for (let i = 0; i < propsArray.length; i++)
        {
            if (reqBody.hasOwnProperty(propsArray[i]) &&
            reqBody[propsArray[i]].trim().length > 0)
            {
                badUser[propsArray[i]] = reqBody[propsArray[i]];
            }
        }

        return badUser;
    }
}