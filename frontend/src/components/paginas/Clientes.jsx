import "./css/Clientes.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Aside from "../layout/Aside";

function Cadastros() {
  const [cliente, setCliente] = useState(null);

  const [clientes, setClientes] = useState([]);

  useEffect(getClientes, []);

  function getClientes() {
    console.log("Passou por aqui...");
    axios.get("http://localhost:3005/clientes").then((resposta) => {
      console.log(resposta.data);
      setClientes(resposta.data);
    });
  }

  function excluirId(id) {
    axios.delete("http://localhost:3005/clientes/" + id).then((res) => {
      getClientes();
    });
  }

  function getLinha(cliente) {
    return (
      <tr>
        <td>{cliente._id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.idade}</td>
        <td>{cliente.cep}</td>
        <td>
          <button className="btExcluir"
            onClick={(event) => {
              excluirId(cliente._id);
            }}
          >
            Excluir
          </button>
          <button className="btEditar" onClick={(event)=>{
            setCliente(cliente);
          }}>Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    const linhas = [];
    for (let i = 0; i < clientes.length; i++) {
      const cliente = clientes[i];
      linhas[i] = getLinha(cliente);
    }

    return linhas;
  }

  function getTabela() {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Idade</th>
          <th>CEP</th>
          <th>Ações</th>
        </tr>
        {getLinhas()}
      </table>
    );
  }

  function onChangeCliente(e, param) {
    setCliente((prevCliente) => ({
      ...prevCliente,
      [param]: e.target.value,
    }));
  }

  function salvar() {
    axios.post("http://localhost:3005/clientes", cliente).then((res) => {
      setCliente(null);
      getClientes();
    });
  }

  function editar(){
    axios.put(`http://localhost:3005/clientes/${cliente._id}`, cliente).then((res) => {
      setCliente(null);
      getClientes();
    });
  }

  function getFormulario() {
    //TODO: Add range input size variable for age (idade in potuguese)
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          onChange={(event) => {
            onChangeCliente(event, "nome");
          }}
          value={cliente.nome}
        />

        <label>Idade</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeCliente(event, "idade");
          }}
          value={cliente.idade}
        />

        <label>CEP</label>
        <input
          type="text"
          onChange={(event) => {
            onChangeCliente(event, "cep");
          }}
          value={cliente.cep}
        />

        <button className="btSalvar"
          onClick={(event) => {
            if(cliente._id){
              editar();
            }else{
              salvar();
            }
          }}
        >
          Salvar
        </button>
        <button className="btCancelar"
          onClick={() => {
            setCliente(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  function getConteudo() {
    if (cliente) {
      return getFormulario();
    } else {
      return (
        <>
          <button
            onClick={() => {
              setCliente({
                nome: "",
              });
            }}
          >
            Cadastrar Cliente
          </button>

          {getTabela()}
        </>
      );
    }
  }

  return (
    <div className="cadastros">
      <Aside />
      <div className="conteudo">
        <h2>Cadastro de Clientes</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Cadastros;
