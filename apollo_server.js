const  {ApolloServer,gql} = require('apollo-server');
const typeDef = require('./types')
const resolver = require('./resolver');
const context = require('./context');

// Create a apollo server instance
const server = new ApolloServer({
    typeDefs:typeDef,
    resolvers:resolver,
    context:context
});


server.listen().then(({url})=>{
  console.log(`🚀  Server ready at ${url}`);
})


