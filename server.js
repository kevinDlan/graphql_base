const{buildSchema} = require('graphql');
const express = require('express');
const {graphqlHTTP} = require('express-graphql')
const users = require('./users.json');


const app = express();

let fakeDb = [
              {id:1,name:"office",rent:"$25",status:"available"},
              {id:2,name:"co-working",rent:"$16",status:"not_available"}
            ];




const schema = buildSchema(`

    type Person
    {
        id:Int
        name:String,
        email:String,
        post:String,
        otherSkill:String
    }
    type Developper
    {
        profil:Person
        language:[String]
        experience:Int
    }
    type Query
    {
        user(id:Int):Person
        isDevelopper:Boolean,
        users:[Person],
        getMsg:String,
        getSpace(id:Int!):Space!
        spaces(status:STATUS):[Space!]!
    }
    enum STATUS
    {
      available
      not_available
    }
    type Space
    {
      id:Int,
      name:String,
      rent:String
      status:STATUS
    }
    input SpaceInput
    {
     id:ID,
     name:String,
     rent:String,
     status:STATUS
    }
    type Mutation
    {
      addMsg(msg:String):String,
      createSpace(input:SpaceInput):Space!,
      updateSpace(input:SpaceInput):Space!
    }

`);

const root = {
  user: ({ id }) => users.find((user) => user.id === id),

  // language: ["PHP", "Javascript", "Dart", "Python"],
  // experience:3,
  isDevelopper: () => true,
  users: () =>  users,
  addMsg: ({ msg }) => 
  {
    fakeDb.message = msg;
  },
  // getMsg: () => fakeDb.message,
  createSpace:({input})=>{fakeDb.push({ ...input }); return fakeDb[fakeDb.length-1]},
  getSpace:({id})=>fakeDb.find((space)=> space.id ===id),
  updateSpace:({input})=>{
    let index = input.id-1;
    fakeDb[index] = {...input};
    return fakeDb[index];
  },
  spaces:({status})=> 
  {
    if(status)
    {
      return fakeDb.filter((space) => space.status === status);
    }
     return fakeDb;
  },
};

app.use(
    '/graphqli',graphqlHTTP({
        schema:schema,
        rootValue:root,
        graphiql:true,
    })
);

app.listen(4000);
console.log("Express App are running on http://localhost:4000/graphqli");

// graphql(schema,'{name,email}',root).then((res)=>console.log(res))

// Make a CRUD with fetch API
// fetch('/graphqli',{
//     method:'POST',
//     headers:{
//         'Content-Type':'application/json',
//         'Accept':'application/json'
//     },
//     body:JSON.stringify({query:'{name,email}'})
// }).then(
//     (data)=>{
//         console.log(data);
//     }
// )
// .catch( (error)=>{
//     console.log(error);
// })

// GraphQL variable,Fragment and directive
// fragment userField on Person
// {
//  id
//  name
//  email @skip(if:$showSkill)
//  post @include(if : $showSkill)
//  otherSkill @include(if : $showSkill)
// }

// query($showSkill:Boolean = true){
//   User1:user(id:1)
//   {
//     ...userField
//   }
//   User2:user(id:2)
//   {
//   ...userField
//   }
// }
