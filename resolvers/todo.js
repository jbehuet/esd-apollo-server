import { GraphQLError } from "graphql";
import { persons } from "./person.js";
import { todos as todosInMemory } from "../data/todos.js";

let todos = [...todosInMemory];

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
      const todo = {
        id: todos.length,
        task: args.task,
        completed: args.completed || false,
        author: persons[args.idAuthor],
      };
      todos.push(todo);
      return todo;
    },
    updateTodo: (_, args) => {
      const idx = todos.findIndex((todo) => todo.id == args.id);
      if (args.task) todos[idx].task = args.task;
      if (args.hasOwnProperty("completed"))
        todos[idx].completed = args.completed;
      if (args.idAuthor) todos[idx].author = persons[args.idAuthor];

      return todos[idx];
    },
    deleteTodo: (_, args) => {
      const todo = todos.find((todo) => todo.id == args.id);
      if (!todo) {
        throw new GraphQLError(`La tache d'id ${args.id} n'existe pas`, {
          extensions: {
            code: "NOT FOUND",
            http: {
              status: 404,
            },
          },
        });
      }
      todos = todos.filter((todo) => todo.id != args.id);
      return todo;
    },
  },
};

export { todoResolvers };
