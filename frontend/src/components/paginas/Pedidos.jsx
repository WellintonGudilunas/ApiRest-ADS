import "./css/Pedidos.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Aside from "../layout/Aside";

function Pedidos() {
  const [cliente, setCliente] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [quantidade, setQuantidade] = useState(null);
  const [produto, setProduto] = useState(null);
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

  function getLinha(pedido) {
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
            setPedido(pedido);
          }}>Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    console.log(pedido)
    if(pedidos["msg"]) return null;
    
    return pedidos.map((pedido) => {
      return getLinha(pedido);
    });
  }

  function getTabela() {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Id dos Produtos</th>
          <th>Quantidade</th>
          <th>Preco</th>
          <th>Data do Pedido</th>
          <th>Ações</th>
        </tr>
        {getLinhas()}
      </table>
    );
  }

  function onChangeCliente(e, param) {
    setCliente(e.target.value);
  }

  function onChangeProduto(e, param) {
    setProduto(e.target.value);
  }

  function onChangeQuantidade(e, param) {
    setQuantidade(e.target.value);
  }

  function salvar() {
    let req = {
      "idCliente": cliente,
      "produtos": [{"idProduto" : produto, "quantidade" : quantidade}]
    }
    axios.post("http://localhost:3005/pedidos", req).then((res) => {
      setPedido(null);
      getPedidos();
    });
    setPedido(null);
  }

  function editar(){
    axios.put(`http://localhost:3005/pedidos/${pedido._id}`, pedido).then((res) => {
      setPedido(null);
      getPedidos();
    });
  }

  function getFormulario() {
    //TODO: Add range input size variable for age (idade in potuguese)
    return (
      <form>
        <label>Id cliente</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeCliente(event, "idCliente")
          }}
          value={cliente}
        />

        <label>Id produto</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeProduto(event);
          }}
          value={produto}
        />

        <label>Quantidade</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeQuantidade(event);
          }}
          value={quantidade}
        />

        <button className="btSalvar"
          onClick={(event) => {
            event.preventDefault();
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
            setPedido(null);
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
              setPedido({
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
