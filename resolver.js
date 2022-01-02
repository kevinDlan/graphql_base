const { Op } = require("sequelize");

// Define the resolver
const resolver = {
  Person: {
    __resolveType(person, context, info) {
      if (person.species) {
        return "Human";
      }

      if (!person.species) {
        return "NonHuman";
      }

      return null;
    },
  },
  Human: {
    wand(parent, __, { wands }) {
      console.log(parent.id);
      return wands.find((w) => w.character_id === parent.id);
    },
  },
  Wand: {
    length(parent) {
      return parent.length ?? 0;
    },
  },
  Query: {
    books: (licence, { books }) => {
      if (licence) {
        return books.filter((book) => book.licence === licence);
      } else {
        return books;
      }
    },
    humans: (_, __, { Person }) => {
      return Person.findAll();
    },
    nonHuman: (_, __, { Person }) => 
    {
      return Person.findAll({
        where:{
          species:
          {
            [Op.ne]:null
          }
        }
      });
    },
    person(_, __, { Person }) {
      return Person.findAll();
    },
    human: (_, { id }, { Person }) => {
      // console.log(context);
      return Person.findAll({
        where:{
          id:id
        }
      });
    },
  },
  Mutation: {
    async createHuman(_, { inputs }, { Person }) 
    {
      return await Person.create(inputs);
    },
  },
};

module.exports = resolver;
