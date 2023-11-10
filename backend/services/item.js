const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertData(req, res) {
    const data = req.query
    console.log(data.nombre)
    console.log(data.marca)
    console.log(data.tipo)
    console.log(data.precio)
    const result = await db.query(`
        insert into coleccion (nombre,marca,tipo,precio)
        values ('${data.nombre}','${data.marca}','${data.tipo}','${data.precio}')
    `)
    return result.affectedRows
}
async function getData(req, res) {
    const rows = await db.query('select * from coleccion')
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData(req, res) {
    const data = req.query
    const result = await db.query(`delete from coleccion where id=${data.id}`)
    return result.affectedRows
}

module.exports = {
    getData, insertData, deleteData
}