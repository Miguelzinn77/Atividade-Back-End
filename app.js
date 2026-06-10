// npm init -y
// npm install prompt-sync
// npm install bcrypt - para criptografar as senhas

// REQUISITOS DA ATIVIDADE BACK-END
// cadastrar dados
// listar dados
// buscar informações
// atualizar registros
// deletar registros
// consultar relacionamentos entre tabelas

const prompt = require('prompt-sync')();
const { createClient } = require('@supabase/supaase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

async function cadastrarDados() {
    let nome = prompt(' Digite seu nome: ')
    let cpf = prompt(' Digite seu CPF: ')
    let telefone = prompt(' Digite seu número de telefone: ')
    let endereco = prompt(' Digite seu endereço: ')
    let senha = prompt(' Digite sua senha: ')

    let cadastrarDados = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        endereco: endereco,
        senha: senha
    }
    const {data, error} = await supabase.from('biblioteca_usuarios').insert(cadastrarDados).select()
}
cadastrarDados(); // chama a função de cadastro


async function listarDados() {
    const {data, error} = await supabase.from('biblioteca_usuarios').select('nome, cpf, endereco');

    data.forEach(dados => {
        console.log(`nome: ${dados.nome}, cpf: ${dados.cpf}, endereco: ${dados.endereco}`)
    });
}
listarDados(); // chama a função listar dados