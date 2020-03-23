const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {
    let usuario = await db('usuarios').where({ email }).first()

    if (usuario) {
        await db('usuarios').where({ email })
            .update({
                nome,
                email,
                senha
            })
        // usuario = { ...usuario, nome, email, senha }
    }
    else {
        await db.insert({ nome, email, senha }).into('usuarios')
        // usuario = await db('usuarios').where({ nome }).first()
    }

    return await db('usuarios').where({ email }).first()
    // return usuario
}

async function salvarPerfil(nome, rotulo) {
    let perfil = await db('perfis').where({ nome }).first()

    if(perfil) {
        await db('perfis').where({ nome })
            .update({
                nome,
                rotulo
            })
    }
    else {
        await db.insert({ nome, rotulo }).into('perfis')
    }

    return await db('perfis').where({ nome }).first()
}

async function adicionarPerfis(usuario, ...perfis) {
    const usuario_id = usuario.id
    await db('usuarios_perfis')
        .where({ usuario_id })
        .delete()

    for(perfil of perfis) {
        const perfil_id = perfil.id
        await db('usuario_perfis')
            .insert({ usuario_id, perfil_id })
    }
}

async function executar() {
    const usuario = await salvarUsuario('Ana',
        'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh', 'Pessoal')
    const perfilB = await salvarPerfil('fin', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())