const fs = require('fs');
const request = require('request');

var descargarImagen = function(uri, filename, callback){
    request.head(uri, function(err, res, body){

        request(uri).pipe(fs.createWriteStream('src/pdf/imgs/'+filename)).on('close', callback);
        
    });
};

module.exports = descargarImagen;

