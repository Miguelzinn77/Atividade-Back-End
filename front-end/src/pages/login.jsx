import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();
    let usuario = {
      cpf: cpf,
      email: email,
    };

    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dados = await resposta.json();
    console.log(dados.usuario);

    if (!resposta.ok) {
      return { msg: "Resporta inválida" };
    }

    localStorage.setItem("token", dados.token);
    localStorage.setItem("id", dados.usuario.id);
    localStorage.setItem("nome", dados.usuario.nome);
    localStorage.setItem("tipo", dados.usuario.tipo);

    if (dados.usuario.tipo == "funcionario") {
      navigate("/funcionario");
    }

    if (dados.usuario.tipo == "cliente") {
      navigate("/cliente");
    }
  }

  return (
    <>
      <h1 className="text-center">Sistema Bancário</h1>

      <div className="row justify-content-center">
        <div className="col-6">
          <h3>Login</h3>
          <form className="" onSubmit={fazerLogin}>
            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">
                CPF
              </label>
              <input
                onChange={(e) => {
                  setCpf(e.target.value);
                }}
                type="text"
                className="form-control"
                id="cpf"
                name="cpf"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
