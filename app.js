// npm init -y
// npm install prompt-sync
//npm install @supabase/supabase-js
// npm install bcrypt - para criptografar as senhas

// REQUISITOS DA ATIVIDADE BACK-END
// cadastrar dados
// listar dados
// buscar informações
// atualizar registros
// deletar registros
// consultar relacionamentos entre tabelas

const prompt = require("prompt-sync")();
const { createClient } = require("@supabase/supaase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

async function cadastrarCliente() {
  let nome = prompt(" Digite seu nome: ");
  let cpf = prompt(" Digite seu CPF: ");
  let telefone = prompt(" Digite seu número de telefone: ");
  let endereco = prompt(" Digite seu endereço: ");
  let senha = prompt(" Digite sua senha: ");

  let cadastrarCliente = {
    nome: nome,
    cpf: cpf,
    telefone: telefone,
    endereco: endereco,
    senha: senha,
  };
  const { data, error } = await supabase
    .from("banco_clientes") // banco clientes
    .insert(cadastrarCliente)
    .select();
}
cadastrarCliente(); // chama a função de cadastro

async function listarCliente() {
  const { data, error } = await supabase
    .from("banco_clientes") // lista do banco clientes
    .select("nome, cpf, endereco");

  data.forEach((dados) => {
    console.log(
      `nome: ${dados.nome}, cpf: ${dados.cpf}, endereco: ${dados.endereco}`,
    );
  });
}
listarCliente(); // chama a função listar dados

async function buscarClientes(id) {
  let nome = prompt(" Digite seu nome: ");
  let cpf = prompt(" Digite seu CPF: ");
  let telefone = prompt(" Digite seu número de telefone: ");
  let endereco = prompt(" Digite seu endereço: ");
  let senha = prompt(" Digite sua senha: ");

  let buscarClientes = {
    nome: nome,
    cpf: cpf,
    telefone: telefone,
    endereco: endereco,
    senha: senha,
  };
  const { data, error } = await supabase
    .from("banco_clientes") // busca no banco clientes
    .update(buscarClientes)
    .eq("id", id).select();
  if (error) {
    console.log(error);
  }
  data.forEach((id) => {
    console.log(
      `nome: ${id.nome}, cpf: ${id.cpf}, telefone: ${id.telefone}, endereco: ${id.endereco}, senha: ${id.senha}`,
    );
  });
}
buscarClientes();

async function deletarCliente(id) {
  let nome = prompt(" Digite seu nome: ");
  let cpf = prompt(" Digite seu CPF: ");
  let telefone = prompt(" Digite seu número de telefone: ");
  let endereco = prompt(" Digite seu endereço: ");
  let senha = prompt(" Digite sua senha: ");

  let deletarCliente = {
    nome: nome,
    cpf: cpf,
    telefone: telefone,
    endereco: endereco,
    senha: senha,
  };
  const { data, error } = await supabase
    .from("biblioteca_usuarios")
    .delete(deletarCliente)
    .eq("id", id).select();
  if (error) {
    console.log(error);
  }
}
deletarCliente();

async function cadastrarConta() {
    let nome = prompt('Digite seu nome:')
    let cpf = prompt(" Digite seu CPF: ");
    let telefone = prompt(" Digite seu número de telefone: ");
    let endereco = prompt(" Digite seu endereço: ");
    let senha = prompt(" Digite sua senha: ");

    let cadastrarConta = {
        nome : nome,
        cpf: cpf,
        telefone: telefone,
        endereco: endereco,
        senha: senha,
    }

const { data, error } = await supabase.from('biblioteca_perfil').select()

}
cadastrarConta();

async function listarContas() {
     const { data, error } = await supabase
    .from("banco_contas") // lista do banco contas
    .select("agência, tipo_da_conta");

  data.forEach((dados) => {
    console.log(
      `nome: ${dados.agencia}, cpf: ${dados.tipo_da_conta}, `,
    );
  });


}