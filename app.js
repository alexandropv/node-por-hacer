const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');



let commando = argv._[0];

switch (commando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        porHacer.listar();
        break;

    case 'actualizar':
        porHacer.actualizar(argv.descripcion, argv.completado);
        break;

    case 'borrar':
        porHacer.borrar(argv.descripcion);
        break;

    default:
        console.log('Commando desconocido.');

}