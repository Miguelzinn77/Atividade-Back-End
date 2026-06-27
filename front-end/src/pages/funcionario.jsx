import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Funcionario() {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/funcionario/perfil', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.erro) {
          throw new Error(dados.erro);
        }
        setUsuario(dados.usuario);
      })
      .catch((error) => {
        setErro(error.message);
      });
  }, []);

  function logout() {
    localStorage.clear();
    navigate('/login', { replace: true });
  }

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Painel do funcionário</h2>
            <button className="btn btn-outline-danger" onClick={logout}>Sair</button>
          </div>
          {erro ? <div className="alert alert-danger">{erro}</div> : null}
          {usuario ? (
            <div>
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Tipo:</strong> {usuario.tipo}</p>
            </div>
          ) : (
            <p>Carregando informações...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Funcionario;
