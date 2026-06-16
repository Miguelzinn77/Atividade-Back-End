// npm init -y
// npm install dotenv
// npm install prompt-sync
// npm install @supabase/supabase-js
// npm install bcrypt - para criptografar as senhas

// REQUISITOS DA ATIVIDADE BACK-END
// cadastrar dados
// listar dados
// buscar informações
// atualizar registros
// deletar registros
// consultar relacionamentos entre tabelas

const prompt = require("prompt-sync")();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const bcrypt = require("bcrypt");
const app = express(); // porta das rotas
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

async function cadastrarCliente() {
  console.log("Cadastro de clientes!");
  let nome = prompt(" Digite seu nome: ");
  let cpf = prompt(" Digite seu CPF: ");
  let email = prompt(" Digite o email: ");
  let telefone = prompt(" Digite seu número de telefone: ");
  let dataCadastro = prompt(" Data de cadastro: ");
  let endereco = prompt(" Digite seu endereço: ");
  let senha = prompt(" Digite sua senha: ");

  let saltRounds = 7; // número de rounds para gerar o salt, quanto maior, mais seguro, mas também mais lento
  let senhaCrip = await bcrypt.hash(senha, saltRounds); // criptografa a senha usando bcrypt

  let cadastrarCliente = {
    nome: nome,
    cpf: cpf,
    telefone: telefone,
    endereco: endereco,
    senha: senhaCrip,
  };
  const { data, error } = await supabase
    .from("banco_clientes") // banco clientes
    .insert(cadastrarCliente)
    .select();

  console.log(data);
  console.log(error);
}
// cadastrarCliente(); // chama a função de cadastro

async function listarCliente() {
  console.log("Lista de clientes!");
  const { data, error } = await supabase
    .from("banco_clientes") // lista do banco clientes
    .select("nome, cpf, endereco");

  data.forEach((dados) => {
    console.log(
      `nome: ${dados.nome}, cpf: ${dados.cpf}, endereco: ${dados.endereco}`,
    );
  });
}
// listarCliente(); // chama a função listar dados

async function buscarClientes(id) {
  console.log("Busca de clientes!");
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
    .eq("id", id)
    .select();
  if (error) {
    console.log(error);
  }
  data.forEach((id) => {
    console.log(
      `nome: ${id.nome}, cpf: ${id.cpf}, telefone: ${id.telefone}, endereco: ${id.endereco}, senha: ${id.senha}`,
    );
  });
}
// buscarClientes();

// atualizar o cliente no banco cliente
app.put("/atualizarcliente/:id", async (req, res) => {
  const id = req.params.id;
  const atualizar = req.body;
  const { data, error } = await supabase
    .from("banco_clientes")
    .update(atualizar)
    .eq("id", id);
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
  res.send(data);
});

// DELETAR
async function deletarCliente(id) {
  console.log("Deletar cliente!");
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
    .from("banco_clientes")
    .delete(deletarCliente)
    .eq("id", id)
    .select();
  if (error) {
    console.log(error);
  }
}
// deletarCliente();


// CADASTRAR CONTA
async function cadastrarConta() {
  console.log("Cadastro de contas!");
  let numero_da_conta = prompt("Digite o número da conta:");
  let agencia = prompt(" Digite o número da agência: ");
  let tipo_da_conta = prompt(" Digite o tipo da conta: ");
  let data_de_abertura = prompt(" Digite a data de abertura: ");
  let saldo_inicial = prompt(" Digite o saldo inicial: ");

  let cadastrarConta = {
    numero_da_conta: numero_da_conta,
    agencia: agencia,
    tipo_da_conta: tipo_da_conta,
    data_de_abertura: data_de_abertura,
    saldo_inicial: saldo_inicial,
  };

  const { data, error } = await supabase
    .from("banco_contas")
    .insert(cadastrarConta)
    .select();

  if (error) {
    console.log("Erro ao cadastrar conta:", error);
    return;
  }
  console.log("Conta cadastrada com sucesso:", data);
  return data;
  res.send(data);
}
// cadastrarConta();


//L LISTAR
async function listarContas() {
  console.log("Lista de contas!");
  const { data, error } = await supabase
    .from("banco_contas") // lista do banco contas
    .select("agencia, tipo_da_conta, saldo_inicial");

  if (!data || data.length === 0) {
    console.log("Nenhuma conta encontrada.");
    return;
  }
  data.forEach((dados) => {
    console.log(
      `agência: ${dados.agencia}, tipo da conta: ${dados.tipo_da_conta}, saldo: ${dados.saldo_inicial}`,
    );
  });
  console.log(data);
}
// listarContas();


// TRANSAÇÃO
async function registrarTransacao() {
  console.log("Registrar transação!");

  const { data, error } = await supabase
    .from("banco_transacoes")
    .select("tipo_da_transacao, valor_da_transacao")
    .eq("id", id);

  if (error) {
    console.log(error);
  }
}
// registrarTransacao();


// LISTAR TRANSAÇÃO
async function listarTransacoes() {
  console.log("Lista de transações!");

  const { data, error } = await supabase
    .from("banco_transacoes")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error);
  }
}

// menu para o usuário escolher as opções
async function menu() {
  let opcao = "";

  while (opcao !== "0") {
    console.log("===== Menu =====");
    console.log("1 - cadastrar cliente");
    console.log("2 - listar cliente");
    console.log("3 - buscar cliente");
    console.log("4 - deletar cliente");
    console.log("5 - cadastrar conta");
    console.log("6 - listar conta");
    console.log("7 - registrar transação");
    console.log("8 - listar transacoes");
    console.log("0 - sair");

    opcao = prompt("Digite uma opcao: ");

    switch (opcao) {
      case "1":
        await cadastrarCliente();
        break;
      case "2":
        let usuario = await listarCliente();
        if (usuario) {
          console.log(`Bem vindo ${usuario.nome}`);
          if (usuario.tipo == "cliente") {
            c1onsole.log("===== Menu =====");
            console.log("1 - listar clientes");
            console.log("0 - sair");

            let seCliente = prompt("Digite uma opcao: ");
            if (seCliente !== "0") {
              switch (seCliente) {
                case "1":
                  await listarClientes();
                  break;
                default:
                  console.log("Opcao invalida.");
              }
            }
          }
        }
      case "3":
        buscarClientes();
        break;
      case "4":
        deletarCliente();
        break;
      case "5":
        cadastrarConta();
        break;
      case "6":
        listarContas();
        break;
      case "7":
        registrarTransacao();
        break;
      case "8":
        listarTransacoes();
        break;
      case "0":
        console.log("Saindo...");
        break;
      default:
        console.log("Opcao invalida. Tente novamente.");
    }
  }
}
menu();
