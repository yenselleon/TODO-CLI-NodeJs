const {guardarDB, leerDB, } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausar, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

//Si hay algun desperfecto al dibujar en la consola verificar si se esta esperando alguna premesa
const main = async() =>{
    
    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();

    if(tareasDB) {
        tareas.crearTareasFromArr(tareasDB);
    }

    await pausar();


    do{
        
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listarPendietesCompletados()
                break;
            case '4':
                tareas.listarPendietesCompletados(false)
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletarTareas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Estas Seguro?')
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada')
                    }
                }
                break;
            default:
                break;
        }
        
        guardarDB(tareas.listadoArr);

        await pausar();

    } while (opt !== '0');


}

main();