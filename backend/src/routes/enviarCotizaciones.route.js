const { Router } = require('express');
const generador = require('../services/GenerarCotizacionPDF');
const sendMail = require('../services/sendMail');
const fs = require('fs');

const router = Router();

const enviar = async(req, res)=>{

    const id = req.params.id;

    await generador.cotizacion1(id);
    await sendMail('desaubv@gmail.com', 'Cotizacion '+id, '<h1>Si</h1>', id+'.pdf', ()=>{
        try {
            fs.unlinkSync('src/pdf/'+id+'.pdf');
        } catch(err) {
            console.error('Something wrong happened removing the file', err)
        }
    });
    

    res.json({exito: true});
}

router.route('/:id')
    .post(enviar)




module.exports = router;