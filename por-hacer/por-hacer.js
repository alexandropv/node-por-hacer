const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();


    return porHacer;
}

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar')
    });
    listar();

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json')
    } catch {

    }



}

const listar = () => {
    cargarDB();
    console.log('========== Por Hacer =========='.yellow);

    for (let i = 0; i < listadoPorHacer.length; i++) {
        let marca = ' ';
        if (listadoPorHacer[i].completado)
            marca = 'X';

        if (listadoPorHacer[i].completado)
            console.log(`${ listadoPorHacer[i].descripcion }     [${marca}]`.gray);
        else
            console.log(`${ listadoPorHacer[i].descripcion }     [${marca}]`.green);
    }
    console.log('==============================='.yellow);
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index > -1) {
        listadoPorHacer[index].descripcion = descripcion;
        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;
    } else {
        console.log('No se encontro la tarea');
        return false;
    }


}

const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index > -1) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        console.log('No se encontro la tarea');
        return false;
    }



}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}