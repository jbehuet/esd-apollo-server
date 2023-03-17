(function main() {
  function todo(task) {
    return `<tr>
                <td>${task.id}</td>
                <td>${task.task}</td>
                <td>${task.completed ? "X" : "-"}</td>
            </tr>`;
  }

  async function todos() {
    const query = {
      query: "query Todos { todos { id task completed } } ",
      variables: {},
    };

    const url = "http://localhost:4000/graphql";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(query),
    };

    const response = await fetch(url, options);
    const { data } = await response.json();

    const todos = data.todos.map((t) => todo(t));

    return todos.join("");
  }

  const app = document.getElementById("todosTable");
  todos().then((result) => (app.innerHTML = result));
})();
