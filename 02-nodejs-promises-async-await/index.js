/*
Obter um usuario
Obter o numero de teletone de um usuario a partir de seu Id
Obter o endereço do usuario pelo Id
*/

//importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(){
    //quando der algum problema -> reject(ERRO)
    //quando success -> RESOLVE
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function () {
            //return reject(new Error('DeEU RUIM DE VERDADE!'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function() {
            return resolve({
                telefone: '1199022',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback){
        setTimeout(() => {
            return callback(null, {
                rua: 'dos bobos',
                numero: 0
            })
        }, 2000)    
}

//1º passo adicionar a palavra async -> automaticamente ela retornará uma Promise

//console.time('t') console.timeEnd('t') -> medir o tempo de execução de uma funcao
main();
async function main(){

        try{
            console.time('medida-promise')
            const usuario = await obterUsuario();
            // const telefone = await obterTelefone(usuario.id);
            // const endereco = await obterEnderecoAsync(usuario.id);
            const resultado = await Promise.all([
                obterTelefone(usuario.id),
                obterEnderecoAsync(usuario.id)
            ])
            const endereco = resultado[1];
            const telefone = resultado[0];
            console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereco: ${endereco.rua}, ${endereco.numero}
            `)
            console.timeEnd('medida-promise')
        }catch(error){
            console.log('DEU RUIM', error);
        }
}



// const usuarioPromise = obterUsuario();
// //para manipular o sucesso usamos a função .then
// //para manipular erros, usamos o .catch
// //usuario -> telefone -> telefone
// usuarioPromise
//     .then(function (usuario){
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result){
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result){
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         });
//     })
//     .then(function(resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `);
//     })
//     .catch(function (error) {
//         console.log('DEU RUIM', error)
//     })
