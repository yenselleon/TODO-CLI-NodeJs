const inquirer = require('inquirer');
const CheckboxPrompt = require('inquirer/lib/prompts/checkbox');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea Hacer?',
    choices: [
        {
            value: '1',
            name: `${'1'.green}. Crear Tarea`
        },
        {
            value: '2',
            name: `${'2'.green}. Listar Tareas`
        },
        {
            value: '3',
            name: `${'3'.green}. Tareas Completadas`
        },
        {
            value: '4',
            name: `${'4'.green}. Listar Tareas Pendientes`
        },
        {
            value: '5',
            name: `${'5'.green}. Completar Tareas`
        },
        {
            value: '6',
            name: `${'6'.green}. Borrar Tarea`
        },
        {
            value: '0',
            name: `${'0'.green}. Salir`
        },
    ]
}]


const inquirerMenu = async()=> {

    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una Opcion'.white);
    console.log('======================='.green);


    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausar = async() => {

    const input = [{
        type: 'input',
        name: 'pausa',
        message: `Pulsa ${'Enter'.green} para Continuar`,
    }]

    console.log('\n')
    const {pausa} = await inquirer.prompt(input);

    return pausa;
}


const leerInput = async(message)=> {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return "Introduzca un valor para Continuar"
            }

            return true;
        }
    }]

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async(tareas)=>{

    const choices = tareas.map((tarea, i) => {


        return {
                value: tarea.id,
                name: `${(i + 1 + '.').green} ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar',
    })

    const question = [
        {
            type: 'list',
            name: 'borrar',
            choices
        }
    ]

    const {borrar} = await inquirer.prompt(question);
    return borrar;

    
}

const mostrarListadoCheckList = async(tareas = [])=>{

    const choices = tareas.map((tarea, i) => {


        return {
                value: tarea.id,
                name: `${(i + 1 + '.').green} ${tarea.desc}`,
                checked: (tarea.completadoEn) ? true : false
        }

    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;

    
}

const confirmar = async(message)=> {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message,
    }]

    const {ok} = await inquirer.prompt(question);
    return ok;

}

module.exports = {
    inquirerMenu,
    pausar,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}