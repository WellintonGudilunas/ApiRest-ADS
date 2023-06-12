import "./css/Pedidos.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Aside from "../layout/Aside";

function Pedidos() {
  const [pedido, setCliente] = useState(null);

  const [pedidos, setPedidos] = useState([]);

  useEffect(getPedidos, []);

  function getPedidos() {
    axios.get("http://localhost:3005/pedidos").then((resposta) => {
      console.log("excluindo 24");
      console.log(resposta);
      setPedidos(resposta.data);
    });
  }

  function excluirId(id) {
    axios.delete("http://localhost:3005/pedidos/" + id).then((res) => {
      console.log("excluindo");
      getPedidos();
    });
  }

  function getLinha(pedido) {
    return (
      <tr>
        <td>{pedido.idItensPedido.coisasCompradas[0].idProduto}</td>
        <td>{pedido.nome}</td>
        <td>{pedido.estoque}</td>
        <td>{pedido.preco}</td>
        <td>{pedido.descricao}</td>
        <td>
          <button
            onClick={(event) => {
              excluirId(pedido._id);
            }}
          >
            Excluir
          </button>
          <button onClick={(event)=>{
            setCliente(pedido);
          }}>Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    const linhas = [];
    for (let i = 0; i < pedidos.length; i++) {
      const pedido = pedidos[i];
      console.log(pedido)
      linhas[i] = getLinha(pedido);
    }

    return linhas;
  }

  function getTabela() {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Estoque</th>
          <th>Preco</th>
          <th>Descrição</th>
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
    axios.post("http://localhost:3005/pedidos", pedido).then((res) => {
      setCliente(null);
      getPedidos();
    });
  }

  function editar(){
    axios.put(`http://localhost:3005/pedidos/${pedido._id}`, pedido).then((res) => {
      setCliente(null);
      getPedidos();
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
          value={pedido.nome}
        />

        <label>Estoque</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeCliente(event, "estoque");
          }}
          value={pedido.estoque}
        />

        <label>Preco</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeCliente(event, "preco");
          }}
          value={pedido.preco}
        />

        <label>Descrição</label>
        <input
          type="text"
          onChange={(event) => {
            onChangeCliente(event, "descricao");
          }}
          value={pedido.descricao}
        />

        <button
          onClick={(event) => {
            if(pedido._id){
              editar();
            }else{
              salvar();
            }
          }}
        >
          Salvar
        </button>
        <button
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
    if (pedido) {
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
            Cadastrar Pedido
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
        <h2>Cadastro de Pedidos</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Pedidos;
