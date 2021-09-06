const Tarea = require("./tarea");
const colors = require('colors')



class Tareas {

    _listado = {};


    get listadoArr() {
         
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        })

        return listado;
    }

    constructor () {

        this._listado = {};
    }

    crearTareasFromArr = (tareas = [])=> {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })

    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto (){

        const tareas = this.listadoArr;
        console.log()
        
        for (let index = 0; index < tareas.length; index++) {
            const {desc, completadoEn} = tareas[index];
            const i = `${colors.green(index + 1)}`;
            
            (!completadoEn)
                ?
                    console.log(`${i} ${desc} :: ${colors.red('Pendiente')}`)
                :
                    console.log(`${i} ${colors.gray(desc)} :: ${colors.green('Completado')}`);
        }

    }

    listarPendietesCompletados (completado = true){

        const filterCompleteList = this.listadoArr.filter( tarea => (completado) 
                                                                ? (tarea.completadoEn) && tarea
                                                                : (!tarea.completadoEn) && tarea );

        filterCompleteList.forEach( (tarea, index) => {
            const i = colors.green(index + 1 + ".");
            const {desc, completadoEn} = tarea;
            const estado = (completado)
                                ? colors.gray('Completado el: ' + tarea.completadoEn)
                                : colors.red('Pendiente');

            console.log(`${i} ${desc} :: ${estado}`);

        })
    }

    borrarTarea(id){

        delete this._listado[id];

    }

    toggleCompletarTareas(ids = []){

        ids.forEach( id => {

            const tarea = this._listado[id];
            tarea.completadoEn = Date.now();

        })

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }

}


module.exports = Tareas;