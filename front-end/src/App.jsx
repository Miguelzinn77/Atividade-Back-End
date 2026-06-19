import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="pt-5">Página de login :</h1>

      <section className="p-5 mt-5 m-5 border border-5 " style={{'background': '#f0f0f0',}}>
        <div class="p-3">
          <label for="cpf" class="cpf">
            Digite seu CPF
          </label>
          <input
            type="cpf"
            class="form-control"
            id="cpf"
            placeholder="Digite seu cpf: "
          />
        </div>

 <div class="p-3">
          <label for="senha" class="senha">
            Digite sua Senha
          </label>
          <input
            type="senha"
            class="form-control"
            id="senha"
            placeholder="Digite sus senha: "
          />
        </div>

  <button class="btn btn-primary" type="submit">Enviar</button>

      </section>
    </>
  );
}

export default App;
