const ctrl = {};
const Usuario = require('../models/clientes.model');

/* --- --- --- --- --- --- ---  C R U D  --- --- --- --- --- --- --- */
//Crear Usuario
ctrl.crear = async(req, res)=>{
    const { 
            id_usuario,
            nombre,
            empresa,
            correo,
            telefono
        } = req.body;

    const newUsuario = new Usuario({
        id_usuario,
        nombre,
        empresa,
        correo,
        telefono
    });

    var error = false;
    await newUsuario.save()
        .catch(err => {
            res.json(err);
            console.log("ERROR: "+err); 
            error = true;
        });

    if(!error){
        res.json(newUsuario);        
    }
}

//Obtener todos los Usuarios
ctrl.obtenerTodo = async(req, res)=>{
    const Usuarios = await Usuario.find();

    res.json(Usuarios);
}

//Obtener un usuario
ctrl.obtenerUno = async(req, res)=>{
    const id = req.params.id;

    var usuario = await Usuario.findById(id)
        .catch(err => {
            res.json(err);
            console.log("ERROR: "+err); 
        });
    
        if(usuario === null){
            res.json({message: 'No se encontro el registro'});
        }else{
            res.json(usuario);
        }
}

//Actualizar usuario
ctrl.actualizar = async(req, res)=>{
    const id = req.params.id;
    const { 
            id_usuario,
            nombre,
            empresa,
            correo,
            telefono
        } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, {
        id_usuario,
        nombre,
        empresa,
        correo,
        telefono
    }).catch(err=>{
        res.json(err);
        console.log("ERROR: "+err); 
    });

    if(usuario === null){
        res.json({message: 'No se encontro el registro'});
    }else{
        res.json(usuario);
    }
}

//Eliminar usuario
ctrl.eliminar = async(req, res)=>{
    const id = req.params.id;

    const usuario = await Usuario.findByIdAndUpdate(id, {
        activo: false
    })
        .catch(err=>{
            res.json(err);
            console.log("ERROR: "+err); 
        });

    if(usuario === null){
        res.json({message: 'No se encontro el registro'});
    }else{
        res.json(usuario);
    }
}

module.exports = ctrl;