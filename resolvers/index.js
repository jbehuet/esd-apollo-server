import { todoResolvers } from "./todo.js";
import { personResolvers } from "./person.js";

const resolvers = {
  Query: {
    ...todoResolvers.Query,
    ...personResolvers.Query,
  },
  Mutation: {
    ...todoResolvers.Mutation,
    ...personResolvers.Mutation,
  },
};

export { resolvers };
