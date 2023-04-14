(function main() {
  function postGraphQL(query) {
    const url = "http://localhost:4000/graphql";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(query),
    };

    return fetch(url, options).then((r) => r.json());
  }

  function updateTodo(e) {
    const query = {
      query: `mutation updateTodo($id: Int, $completed: Boolean) { 
        updateTodo(id: $id, completed: $completed){
          id
          task
          completed
        } 
      } `,
      variables: {
        id: Number(e.target.dataset.id),
        completed: e.target.checked,
      },
    };

    postGraphQL(query).then((r) => console.log(r));
  }

  async function deleteTodo(todoId) {
    const query = {
      query: `mutation deleteTodo($id: Int) { 
        deleteTodo(id: $id){
          id
        } 
      } `,
      variables: {
        id: todoId,
      },
    };

    return postGraphQL(query);
  }

  function todo(task) {
    const tr = document.createElement("tr");
    const tdCheckbox = document.createElement("td");
    tdCheckbox.innerHTML = `<input type="checkbox" 
                              name="completed" 
                              id="completed" 
                              value="completed" 
                              ${task.completed && "checked"} 
                              data-id="${task.id}">`;
    tr.appendChild(tdCheckbox);

    tdCheckbox.addEventListener("click", updateTodo);

    const tdTask = document.createElement("td");
    tdTask.innerHTML = `<td>${task.task}</td>`;
    tr.appendChild(tdTask);

    const tdAuthor = document.createElement("td");
    tdAuthor.innerHTML = `<td>${task.author.name}</td>`;
    tr.appendChild(tdAuthor);

    const tdAction = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z"/></svg>`;

    btn.addEventListener("click", () => {
      deleteTodo(task.id).then(() => init());
    });

    tdAction.appendChild(btn);
    tr.appendChild(tdAction);

    return tr;
  }

  async function todos() {
    const query = {
      query: "query Todos { todos { id task completed author { name } } } ",
      variables: {},
    };

    const { data } = await postGraphQL(query);
    return data.todos.map((t) => todo(t));
  }

  function init() {
    const app = document.getElementById("todosTable");
    app.innerHTML = ""; // reset le contenu
    todos().then((result) => {
      result.map((t) => app.appendChild(t));
    });
  }
  init();
})();
