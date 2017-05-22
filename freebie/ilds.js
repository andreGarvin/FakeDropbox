const fs = require('fs'),
tool = require('./tools.js');

// loads the json file
exports.onload = function( file_name, callback ) {

    // tries the script
    try {
        // checks if the file exist
        fs.exists(file_name, (exst) => {
          if (!exst) return tool.catchError(`*error: '${ file_name }' does not exist`, callback === undefined ? undefined : callback);

          //  if the data exist/JSON file is then load the data and parse the JSON data
          fs.readFile(file_name, 'utf8', (err, data) => {
            if (err) {

              // if the err occured then return the err
              // using the internal tool
              return tool.catchError(err.message, callback === undefined ? undefined : callback);
            }

            // if the data is not empty load it the object property 'my_bin'
            if ( data !== undefined || data !== null ) {

              return callback === undefined ? data : callback( null, data );
            }
            else {

              return tool.catchError(`*error: No data was able to be retrived from ${ file_name }.`, callback === undefined ? undefined : callback);
            }

          });

        })
    }
    catch (err) {
        // if there is a error the return catchError() with a callback{} if one as provided.
        return tool.catchError(err, callback === undefined ? undefined : callback);
    }

}


module.exports.save = () => {}
module.exports.init = () => {}