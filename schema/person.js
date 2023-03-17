const PersonDefs = `
    type Person {
        id: Int
        name: String
    }

    type Query {
        persons: [Person]
        person(id: Int): Person
    }
      
    type Mutation {
        createPerson(name: String): Person
        updatePerson(id: Int, name: String): Person
        deletePerson(id: Int): Person
    }
`;

export { PersonDefs };
