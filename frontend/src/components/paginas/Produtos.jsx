import "./css/Produtos.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Aside from "../layout/Aside";

function Produtos() {
  const [produto, setCliente] = useState(null);

  const [produtos, setProdutos] = useState([]);

  useEffect(getProdutos, []);

  function getProdutos() {
    axios.get("http://localhost:3005/produtos").then((resposta) => {
      console.log("excluindo 24");
      console.log(resposta.data);
      setProdutos(resposta.data);
    });
  }

  function excluirId(id) {
    axios.delete("http://localhost:3005/produtos/" + id).then((res) => {
      console.log("excluindo");
      getProdutos();
    });
  }

  function getLinha(produto) {
    return (
      <tr>
        <td>{produto._id}</td>
        <td>{produto.nome}</td>
        <td>{produto.estoque}</td>
        <td>{produto.preco}</td>
        <td>{produto.descricao}</td>
        <td>
          <button
            onClick={(event) => {
              excluirId(produto._id);
            }}
          >
            Excluir
          </button>
          <button onClick={(event)=>{
            setCliente(produto);
          }}>Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    const linhas = [];
    for (let i = 0; i < produtos.length; i++) {
      const produto = produtos[i];
      linhas[i] = getLinha(produto);
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
    axios.post("http://localhost:3005/produtos", produto).then((res) => {
      setCliente(null);
      getProdutos();
    });
  }

  function editar(){
    axios.put(`http://localhost:3005/produtos/${produto._id}`, produto).then((res) => {
      setCliente(null);
      getProdutos();
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
          value={produto.nome}
        />

        <label>Estoque</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeCliente(event, "estoque");
          }}
          value={produto.estoque}
        />

        <label>Preco</label>
        <input
          type="number"
          onChange={(event) => {
            onChangeCliente(event, "preco");
          }}
          value={produto.preco}
        />

        <label>Descrição</label>
        <input
          type="text"
          onChange={(event) => {
            onChangeCliente(event, "descricao");
          }}
          value={produto.descricao}
        />

        <button
          onClick={(event) => {
            if(produto._id){
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
    if (produto) {
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
            Cadastrar Produto
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
        <h2>Cadastro de Produtos</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Produtos;
