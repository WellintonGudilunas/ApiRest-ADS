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
      setPedidos(resposta.data);
    });
  }

  function excluirId(id) {
    axios.delete("http://localhost:3005/pedidos/" + id).then((res) => {
      getPedidos();
    });
  }

  function getLinha(pedido, x) {
    console.log(pedido)
    return (
      <tr key={pedido._id}>
      <td>{pedido._id}</td>
      <td>
        {pedido.idItensPedido.coisasCompradas.map((produtos) => (
          <span key={produtos.idProduto}>{produtos.idProduto}, </span>
        ))}
      </td>
      <td>
        {pedido.idItensPedido.coisasCompradas.map((produtos) => (
          <span key={produtos.quantidade}>{produtos.quantidade}, </span>
        ))}
      </td>
      <td>{pedido.valorTotal}</td>
      <td>{pedido.data}</td>
        <td>
          <button className="btExcluir"
            onClick={(event) => {
              excluirId(pedido._id);
            }}
          >
            Excluir
          </button>
          <button className="btEditar" onClick={(event)=>{
            setCliente(pedido);
          }}>Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    return pedidos.map((pedido, index) => {
      const contador = index + 1;
      return getLinha(pedido, contador);
    });
  }

  function getTabela() {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Id dos Produtos</th>
          <th>Valor Total</th>
          <th>Preco</th>
          <th>Data do Pedido</th>
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
            onChangeCliente(event, "nome")
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

        <button className="btSalvar"
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
