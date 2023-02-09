const cloudinary = require("cloudinary").v2;
const ctrl = {};
const Empresa = require('../models/empresas.model');

/* --- --- --- --- --- --- ---  C R U D  --- --- --- --- --- --- --- */
//Crear Empresa
ctrl.crear = async(req, res)=>{
    const file = req.files.img;

    var result = await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: Date.now(),
        resource_type: 'auto',
        folder: 'empresas'
    }).catch(err => {
        console.log('Error: '+err);
        result = {url: 'https://res.cloudinary.com/dnrfswnwp/image/upload/v1675969168/empresas/1675969167546.jpg'}
    })

    const { 
            nombre,
            correo,
            telefono,
            pagina,
            direccion,
            folio_coti,    
            folio_ticket,
            condiciones,
    } = req.body;

    const newEmpresa = new Empresa({
        nombre,
        correo,
        telefono,
        pagina,
        direccion,
        folio_coti,    
        folio_ticket,
        condiciones,
        img: result.url
    });

    var error = false;
    await newEmpresa.save()
        .catch(err => {
            res.json(err);
            console.log("ERROR: "+err); 
            error = true;
        });

    if(!error){
        res.json(newEmpresa);        
    }
}

//Obtener todos los Empresas
ctrl.obtenerTodo = async(req, res)=>{
    const empresas = await Empresa.find();

    res.json(empresas);
}

//Obtener un Empresa
ctrl.obtenerUno = async(req, res)=>{
    const id = req.params.id;

    var empresa = await Empresa.findById(id)
        .catch(err => {
            res.json(err);
            console.log("ERROR: "+err); 
        });
    
        if(empresa === null){
            res.json({message: 'No se encontro el registro'});
        }else{
            res.json(empresa);
        }
}

//Actualizar Empresa
ctrl.actualizar = async(req, res)=>{
    const id = req.params.id;
    const { 
            nombre,
            correo,
            telefono,
            pagina,
            direccion,
            folio_coti,    
            folio_ticket,
            condiciones,
            img
        } = req.body;

    const empresa = await Empresa.findByIdAndUpdate(id, {
        nombre,
        correo,
        telefono,
        pagina,
        direccion,
        folio_coti,    
        folio_ticket,
        condiciones,
        img
    }).catch(err=>{
        res.json(err);
        console.log("ERROR: "+err); 
    });

    if(empresa === null){
        res.json({message: 'No se encontro el registro'});
    }else{
        res.json(empresa);
    }
}

//Eliminar Empresa
ctrl.eliminar = async(req, res)=>{
    const id = req.params.id;

    const empresa = await Empresa.findByIdAndDelete(id)
        .catch(err=>{
            res.json(err);
            console.log("ERROR: "+err); 
        });

    if(empresa === null){
        res.json({message: 'No se encontro el registro'});
    }else{
        res.json(empresa);
    }
}

module.exports = ctrl;