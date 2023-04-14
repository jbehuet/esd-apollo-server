import { persons } from "./persons.js";

const todos = [
  {
    id: 0,
    task: "Faire les courses",
    completed: false,
    author: persons[0],
  },
  {
    id: 1,
    task: "Partir en weekend",
    completed: true,
    author: persons[0],
  },
];

export { todos };
