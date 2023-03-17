import { persons } from "../data/persons.js";

const personResolvers = {
  Query: {
    persons: () => persons,
    person: (_, args) => {
      const person = persons.find((person) => person.id == args.id);
      return person;
    },
  },
  Mutation: {
    createPerson: (_, args) => {
      const person = {
        id: persons.length,
        name: args.name,
      };
      persons.push(person);
      return person;
    },
    updatePerson: (_, args) => {
      const idx = persons.findIndex((person) => person.id == args.id);
      persons[idx].name = args.name;
      return persons[idx];
    },
    deletePerson: (_, args) => {
      const person = persons.find((person) => person.id == args.id);
      persons = persons.filter((person) => person.id != args.id);
      return person;
    },
  },
};

export { personResolvers };
