const { Router } = require('express');
const Usuario = require('../models/usuarios.model');
const bcrypt = require("bcryptjs");
const router = Router();

const login = async(req, res)=>{
    const {correo, password} = req.body;
    var login = false;

    const usuarios = await Usuario.find();
    usuarios.map((u)=>{
        if(u.correo == correo){
            bcrypt.compare(password, u.password, (err, coinciden) => {
                if(coinciden){
                    res.json({
                        exito: true,
                        id: u._id
                    });
                }else{
                    res.json({
                        exito: false
                    });
                }
            });
            login = true;
        }
    });

    if(!login){
        res.json({
            exito: false
        });
    }
}

router.route('/')
    .post(login)


module.exports = router;