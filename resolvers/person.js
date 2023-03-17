import { GraphQLError } from "graphql";

import { persons as personsInMemory } from "../data/persons.js";

let persons = [...personsInMemory];

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
      const existingPerson = persons.find(
        (person) =>
          person.name.toLocaleLowerCase() === args.name.toLocaleLowerCase()
      );
      if (existingPerson) {
        throw new GraphQLError(`La personne du nom ${args.name} existe déjà`, {
          extensions: {
            code: "CONFLICT",
            http: {
              status: 409,
            },
          },
        });
      }

      const person = {
        id: persons.length,
        name: args.name,
      };
      persons.push(person);
      return person;
    },
    updatePerson: (_, args) => {
      const idx = persons.findIndex((person) => person.id == args.id);
      if (idx === -1) {
        throw new GraphQLError(`La personne du nom ${args.name} n'existe pas`, {
          extensions: {
            code: "NOT FOUND",
            http: {
              status: 404,
            },
          },
        });
      }

      const existingPerson = persons
        .filter((person) => person.id !== idx)
        .find(
          (person) =>
            person.name.toLocaleLowerCase() === args.name.toLocaleLowerCase()
        );
      if (existingPerson) {
        throw new GraphQLError(`La personne du nom ${args.name} existe déjà`, {
          extensions: {
            code: "CONFLICT",
            http: {
              status: 409,
            },
          },
        });
      }

      persons[idx].name = args.name;
      return persons[idx];
    },
    deletePerson: (_, args) => {
      const person = persons.find((person) => person.id == args.id);
      if (!person) {
        throw new GraphQLError(`La personne d'id ${args.id} n'existe pas`, {
          extensions: {
            code: "NOT FOUND",
            http: {
              status: 404,
            },
          },
        });
      }

      persons = persons.filter((person) => person.id != args.id);
      return person;
    },
  },
};

export { personResolvers, persons };
