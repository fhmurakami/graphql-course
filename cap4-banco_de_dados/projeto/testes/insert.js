const db = require('../config/db')

// const novoPerfil = {
//     nome: 'visitante',
//     rotulo: 'Visitante'
// }

// db('perfis').insert(novoPerfil)
//     .then(res => console.log(res))
//     .catch(err => console.log(err.sqlMessage))
//     .finally(() => db.destroy())

const perfilSU = {
    nome: 'root' + Math.random(),
    rotulo: 'Super Usuário'
}

db.insert(perfilSU).into('perfis')
    .then(res => res[0])
    .then(id => db('perfis').select('id', 'nome', 'rotulo').where({ id: id }).first())
    .then(ultimoPerfil => `id: ${ultimoPerfil.id}, nome: ${ultimoPerfil.nome}, rotulo: ${ultimoPerfil.rotulo}`)
    .then(string => console.log(string))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy())