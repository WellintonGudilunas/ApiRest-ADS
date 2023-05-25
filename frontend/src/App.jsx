function App() {

  return (
    <>
      <header>
		  <h1>Matrix</h1>
      </header>
      <nav>
        <ul>
          <li><a href="">Nav 1</a></li>
          <li><a href="">Nav 2</a></li>
          <li><a href="">Nav 3</a></li>
        </ul>
      </nav>
      <main>
            <div>
          <h1>Formulário CRUD</h1>
          <form>
            <label for="name">Nome</label>
            <input type="text" id="name" name="name" />
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" multiple />
            <button>Salvar</button>
          </form>
          <table>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Maria</td>
              <td>12345</td>
              <td>
                <button>Excluir</button>
                <button>Editar</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Pedro</td>
              <td>34567</td>
              <td>
                <button>Excluir</button>
                <button>Editar</button>
              </td>
            </tr>
          </table>  
        </div>
      </main>
      <aside>Barra lateral</aside>
      <footer>Rodapé</footer>
    </>
  );
}

export default App;
