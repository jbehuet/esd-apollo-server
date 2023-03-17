import { GraphQLError } from "graphql";
import { persons } from "../data/persons.js";
import { todos } from "../data/todos.js";

const todoResolvers = {
  Query: {
    todos: () => todos,
    todo: (_, args) => {
      const todo = todos.find((todo) => todo.id == args.id);
      return todo;
    },
    todosCompleted: () => {
      return todos.filter((todo) => todo.completed);
    },
  },
  Mutation: {
    createTodo: (_, args) => {
      console.log(args.idAuthor);
      if (!args.idAuthor) {
        throw new GraphQLError("idAuthor cannot be null", {
          extensions: {
            code: "BAD_REQUEST",
            http: {
              status: 400,
            },
          },
        });
      }
      const todo = {
        id: todos.length,
        task: args.task || "to be defined",
        completed: args.completed || false,
        author: persons[args.idAuthor],
      };
      todos.push(todo);
      return todo;
    },
    updateTodo: (_, args) => {
      const idx = todos.findIndex((todo) => todo.id == args.id);
      if (args.task) todos[idx].task = args.task;
      todos[idx].completed = args.completed || false;
      todos[idx].author = persons[args.idAuthor];

      return todos[idx];
    },
    deleteTodo: (_, args) => {
      const todo = todos.find((todo) => todo.id == args.id);
      todos = todos.filter((todo) => todo.id != args.id);
      return todo;
    },
  },
};

export { todoResolvers };
