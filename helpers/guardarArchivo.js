const fs = require('fs')

pathArchivo = './db/data.json';

const guardarDB = (data) => {

    fs.writeFileSync(pathArchivo, JSON.stringify(data));
}

const leerDB = ()=> {

    if(!fs.existsSync(pathArchivo)){
        return null;
    }

    const info = fs.readFileSync(pathArchivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;
}




module.exports = {
    guardarDB,
    leerDB,
};