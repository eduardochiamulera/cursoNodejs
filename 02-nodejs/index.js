/*
Obter um usuario
Obter o numero de teletone de um usuario a partir de seu Id
Obter o endereço do usuario pelo Id
*/

function obterUsuario(callback){
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(function() {
        return callback(null, {
            telefone: '1199022',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback){
    setTimeout(function() {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(erro, usuario){
    console.log('usuario', usuario);
}

obterUsuario(function resolverUsuario(error, usuario){
    // null || "" || 0 === false
    if(error){
        console.log('DEU RUIM em USUARIO', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.log('DEU RUIM em TELEFONE', error1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2){
                console.log('DEU RUIM em ENDERECO', error2)
                return;
            }
    
            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })

    
});
//const telefone = obterTelefone(usuario.id);
//console.log('telefone', telefone);