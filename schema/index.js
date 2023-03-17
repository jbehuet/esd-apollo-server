// TypeDefs
import { TodoDefs } from "./todo.js";
import { PersonDefs } from "./person.js";

const RootDefs = `#graphql
  type Query {
    _empty: String
  }
`;

// Schema TypeDefs
const schema = RootDefs + TodoDefs + PersonDefs;

export { schema };
