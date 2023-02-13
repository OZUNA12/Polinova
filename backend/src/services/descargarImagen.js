const fs = require('fs');
const colors = require('colors/safe');
const request = require('request');

var descargarImagen = function(uri, filename, callback){
    request.head(uri, function(err, res, body){

        request(uri).pipe(fs.createWriteStream('src/pdf/imgs/'+filename))
            .on('finish', callback)
            .on('error', ()=>{
                console.log(colors.red('Ha ocurrido un error al descargar la imagen'));
            })
        
    });
};

module.exports = descargarImagen;

