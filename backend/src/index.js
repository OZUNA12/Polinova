const app = require('./app');
var colors = require('colors/safe');
const PDFGenerator = require('pdfkit');


const generador = require('./services/generatePDF');
require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.clear();
    console.log(colors.cyan('El servidor se lanzó en el puerto '+app.get('port')));

    generador.cotizacion1('63e51abcb01f6abd8a5adbc9');

}

main();