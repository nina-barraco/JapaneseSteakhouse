const moment = require('moment');

module.exports = {
    /**
     * Parses a date into a javascript date object
     * @param {*} date 
     * @param {*} time 
     * @returns Object DateObject
     */
    parseDate: function(date, time)
    {
        if (date == null || time == null)
        {
            return null;
        }

        let formatDate = date.replace(/\D/g, ':');
        let newTime = formatDate + ':' + time;
        let reservationDate = moment(newTime, 'YYYY:MM:DD:kk:mm');
        let dateObject = new Date(reservationDate);

        // Use the toLocaleString method to transform into
        // locale specific string.
        // console.log(dateObject.toLocaleString());
        return dateObject;
    },
    // TODO: Figure out how to check property for validation
    /**
     * Sanitize input of possible code injection characters.
     * @param {*} reqBody 
     * @returns {*} req.body
     */
    sanitizeInput: function(reqBody)
    {
        const pattern = /[\<"'{}\[\]\\#\>`]/g;
        if (typeof reqBody == 'undefined')
        {
            return null;
        }

        let keyValueArray = Object.entries(reqBody);
        
        for (let i = 0; i < keyValueArray.length; i++)
        {
            let key = keyValueArray[i][0];
            let value = keyValueArray[i][1];
            
            if (value.trim().length > 0)
            {
                reqBody[key] = value.replace(pattern, '');
            }
        }

        return reqBody;
    }
}