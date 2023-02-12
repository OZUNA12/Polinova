const PDFGenerator = require('pdfkit');
var colors = require('colors/safe');
const fs = require('fs');
const generador = {};

const Cotizacion = require('../models/cotizaciones.model');
const Usuario = require('../models/usuarios.model');
const Cliente = require('../models/clientes.model');
const Empresa = require('../models/empresas.model');
const Item = require('../models/items.model');
const descargarImagen = require('./descargarImagen');


generador.cotizacion1 = async(id)=>{

    const data = await getData(id);    
    
    descargarImagen(data.empresa.img, data.empresa._id+'.jpg', function(){
        
        let doc = new PDFGenerator;

        doc.pipe(fs.createWriteStream('src/pdf/'+data.cotizacion._id+'.pdf'));

        var altura = generarHeader(doc, data);
        altura = generarTabla(doc, data, altura);
        generarFooter(doc, data, altura);

        doc.end();
        console.log(colors.red('PDF '+data.cotizacion._id+'.pdf se ha creado :)'));

    });
}


function generarHeader(doc, data) {

    doc.on('pageAdded', () => {altura=50});


    const maxAlto = 150;
    const maxAncho = 250;
    var folio = '';
    const folioDB = (data.cotizacion.folio).split('');

    for(let i = folioDB.length ; i<4; i++){
        folio+='0';
    }
    folio+=data.cotizacion.folio;


    doc
        .image('src/pdf/imgs/'+data.empresa._id+'.jpg', 20, 20, { fit: [maxAncho, maxAlto], align: 'center'})
        .fillColor('#000')
        .fontSize(30)
        .font('Helvetica-Bold')
        .text('Cotización', 275, 50, {align: 'center', bold: true})
        .fontSize(20)
        .text('Folio: ', 300, 100, {align: 'left'})
        .text('Emitida: ', 300, 120, {align: 'left'})

        .font('Helvetica')
        .text(folio, 360, 100, {align: 'left'})
        .text(data.cotizacion.fecha, 380, 120, {align: 'left'})

        .font('Helvetica-Bold')
        .fontSize(18)
        .text(data.usuario.nombre+' '+data.usuario.apellido, 300, 238, {align: 'right'})


        .moveDown()
    
    doc
        .font('Helvetica-Bold')
        .fontSize(13)
        .text('Atencion '+data.cliente.empresa, 50, 180, {align: 'left', bold: true})

        .fontSize(10)
        .text('Contacto: ', 50, 195, {align: 'left'})
        .text('Telefono: ', 50, 205, {align: 'left'})
        .text('Correo: ', 50, 215, {align: 'left'})

        
        .font('Helvetica')
        .fontSize(10)
        .text(data.cliente.nombre, 98, 195, {align: 'left'})
        .text(data.cliente.telefono, 96, 205, {align: 'left'})
        .text(data.cliente.correo, 89, 215, {align: 'left'})


    const beginningOfPage = 40
    const endOfPage = 560

    doc
        .fontSize(15)
        .font('Helvetica-Bold')
        .text('Condiciones de venta:', 40, 240, {bold: true})
        .font('Helvetica')


    doc.moveTo(beginningOfPage,253)
        .lineTo(endOfPage,255)
        .stroke()

    var altura = 260;
    
    const cond = (data.cotizacion.condiciones).split('|');
    cond.map((c)=>{
        doc
            .fontSize(10)
            .text(c, 45, altura)
            
        altura+=12;
    });
            

    doc.moveTo(beginningOfPage,altura+5)
        .lineTo(endOfPage,altura+5)
        .stroke()
    
    return altura;
}

function generarTabla(doc, data, alt){
    var altura = alt+20;

    doc.on('pageAdded', () => {
        altura=50;
    });

    doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('\CANT', 40, altura+7)
        .text('UNID', 85, altura+7)
        .text('ARTICULO Y DESCRIPCION', 130, altura+7)
        .text('PRECIO\nUNITARIO', 415, altura)
        .text('PRECIO\nTOTAL', 493.5, altura)

        cuadradoNegro(doc, 38, altura-5, 45, 32)
        cuadradoNegro(doc, 83, altura-5, 45, 32)
        cuadradoNegro(doc, 128, altura-5, 284, 32)
        cuadradoNegro(doc, 412, altura-5, 75, 32)
        cuadradoNegro(doc, 487, altura-5, 75, 32)

    altura+=35;

    data.items.map((i)=>{
        var desc = (i.descripcion).split('|');
        var descripcion = '';
        var altCaja = 25;

        desc.map((d)=>{
            descripcion+='    -'+d+'\n';
            altCaja+=10;
        });

        altCaja-=10;

        doc        
            .fontSize(8)
            .fillOpacity(1)
            .fillColor('#000')
            .font('Helvetica')
            .text(i.cantidad ,42, altura)

            .text(i.unidad , 85, altura)
            .text(i.articulo+'\n'+descripcion , 130, altura)
            .text('$'+i.precioUnitario, 415, altura)
            .text('$'+i.importe, 493.5, altura)

        cuadradoItem(doc, 38, altura-8, 45, altCaja)
        cuadradoItem(doc, 83, altura-8, 45, altCaja)
        cuadradoItem(doc, 128, altura-8, 284, altCaja)
        cuadradoItem(doc, 412, altura-8, 75, altCaja)
        cuadradoItem(doc, 487, altura-8, 75, altCaja)

        altura+=altCaja;
    });

    altura+=10;

    doc
        .fontSize(15)
        .fillOpacity(1)
        .fillColor('#000')
        .font('Helvetica-Bold')
        .text('Subtotal: ' ,350, altura)
        .font('Helvetica')
        .text('$'+data.cotizacion.subtotal+' MXN' ,350, altura, {align: 'right'})
    altura+=15;

    doc
        .font('Helvetica-Bold')
        .text('IVA ('+data.cotizacion.iva+'%):' ,350, altura)
        .font('Helvetica')
        .text('$'+data.cotizacion.importeIva+' MXN' ,350, altura, {align: 'right'})

    altura+=15;

    if(data.cotizacion.descuento != 0){
        doc
            .font('Helvetica-Bold')
            .text('Descuento: ' ,350, altura)
            .font('Helvetica')
            .text('-$'+data.cotizacion.descuento+' MXN' ,350, altura, {align: 'right'})
        altura+=15;
    }

    if(data.cotizacion.adicional != 0){
        doc
            .font('Helvetica-Bold')
            .text('Adicional: ' ,350, altura)
            .font('Helvetica')
            .text('$'+data.cotizacion.adicional+' MXN' ,350, altura, {align: 'right'})
        altura+=15;
    }
    altura+=10;

    doc.moveTo(345,altura-3)
        .lineTo(550,altura-3)
        .stroke()

    doc
        .font('Helvetica-Bold')
        .fontSize(20)
        .text('TOTAL: ' ,350, altura)
        .font('Helvetica')
        .text('$'+data.cotizacion.total+' MXN' ,350, altura, {align: 'right'})

    altura+=15;

    return altura;        
}


function generarFooter(doc, data, alt){
    var altura = alt+50;

    doc.on('pageAdded', () => {altura=50});

    doc.moveTo(40,altura-3)
        .lineTo(580,altura-3)
        .stroke()

    const foot = (data.cotizacion.footer).split('|');
    var footer = '';
    foot.map((f)=>{
        footer+=f+'\n';
    });

    doc
        .font('Helvetica')
        .fontSize(8)
        .text(footer, 40, altura)

    altura+=(10*foot.length);

    
    doc
        .font('Helvetica')
        .fontSize(12)
        .text('Le atendio '+data.usuario.nombre+' '+data.usuario.apellido+ ' de ' +data.empresa.nombre, 40, altura+10)
        .fontSize(10)
        .text(data.empresa.direccion, 40, altura+22)
        .text(data.empresa.telefono, 40, altura+34)
        .text(data.empresa.correo, 40, altura+46)
        .text(data.empresa.pagina, 40, altura+58, {link: data.empresa.pagina, underline: true})

    
}

const getData = async(id)=>{

    const cotizacion = await Cotizacion.findById(id)
        .catch(err=>{
            console.log(err);
            return('Ha habido un error: '+err);
        });
    
    const usuario = await Usuario.findById(cotizacion.id_usuario)
        .catch(err=>{
            console.log(err);
            return('Ha habido un error: '+err);
        });
    
    const empresa = await Empresa.findById(usuario.id_empresa)
        .catch(err=>{
            console.log(err);
            return('Ha habido un error: '+err);
        });

    const cliente = await Cliente.findById(cotizacion.id_cliente)
        .catch(err=>{
            console.log(err);
            return('Ha habido un error: '+err);
        });
    
    
    const aux = await Item.find()
        .catch(err=>{
            console.log(err);
            return('Ha habido un error: '+err);
        });
    
    const items = [];
        aux.map((a)=>{
            if((a.id_doc == id) && (a.tipo == 'cotizacion')){
                items.push(a);
            }
        });    

    const data = {
        cotizacion: cotizacion,
        usuario: usuario,
        empresa: empresa,
        cliente: cliente,
        items: items
    }

    return data;
}

function cuadradoNegro(doc, x, y, w, h){
    doc
        .lineJoin('bevel')
        .rect(x, y, w, h)
        .fillOpacity(0.33)
        .fillAndStroke("black", "black")
}

function cuadradoItem(doc, x, y, w, h){
    doc
        .lineJoin('bevel')
        .rect(x, y, w, h)
        .fillOpacity(0)
        .fillAndStroke("white", "black")
}

module.exports = generador;