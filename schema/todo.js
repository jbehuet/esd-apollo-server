const TodoDefs = `
    type Todo {
        id: Int
        task: String!
        completed: Boolean
        author: Person!
    }

    type Query {
        todos: [Todo]
        todo(id: Int): Todo
        todosCompleted: [Todo]
    }
      
    type Mutation {
        createTodo(task: String, completed: Boolean, idAuthor: Int): Todo
        updateTodo(id: Int, task: String, completed: Boolean, idAuthor: Int): Todo
        deleteTodo(id: Int): Todo
    }
`;

export { TodoDefs };
