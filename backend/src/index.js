const app = require('./app');
const sendMail = require('./services/sendMail');
require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.log('El servidor se lanzó en el puerto '+app.get('port'));

    sendMail('desaubv@gmail.com', 'Ejemplo', '<h1>JEJE</h1>');

}

main();