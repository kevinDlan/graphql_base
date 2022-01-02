const {gql } = require("apollo-server");
const typeDef = gql`
  enum LICENCE {
    MIT
    open_source
  }
  type Book {
    id: Int
    title: String
    author: String
    price: Float
    licence: LICENCE
  }
  type Wand {
    wood: String!
    core: String!
    length: Float
  }
  enum GENDER {
    male
    female
  }
  interface Person {
    id: ID!
    name: String
    gender: GENDER
  }
  type NonHuman implements Person {
    id: ID!
    name: String
    gender: GENDER
    species: String
  }
  type Human implements Person {
    id: ID!
    name: String
    gender: GENDER
    dateOfBirth: String
    actor: String
    image: String
    wand: Wand
    species: String
  }
  type Query {
    books(licence: LICENCE): [Book]
    humans: [Human!]!
    nonHuman: [NonHuman!]!
    person: [Person!]!
    human(id: Int): Human
  }
  input CreateInput {
    name: String!
    gender: GENDER!
    dateOfBirth: String!
    actor: String!
    image: String!
  }
  type Mutation {
    createHuman(inputs: CreateInput!): Human
  }
`;

module.exports = typeDef;
