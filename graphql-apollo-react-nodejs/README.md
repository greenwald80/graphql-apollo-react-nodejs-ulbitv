client => npx create-react-app client

server => npm init -y
npm i express graphql express-graphql cors dotenv
npm i nodemon -D


let users = [{ id: 1, username: "Name", age: 100,posts:[{id:1, title:"title", content:"content"}] }];

http://localhost:5000/graphql =>
{
  getUser(id: 1) {
    id
    username
    age
  }
}
=>
{
  "data": {
    "getUser": {
      "id": "1",
      "username": "Name",
      "age": 100
    }
  }
}

http://localhost:5000/graphql =>
{
  getAllUsers {
    id
    username
    age
    posts {
      id
    }
  }
}
=> 
{
  "data": {
    "getAllUsers": [
      {
        "id": "1",
        "username": "Name",
        "age": 100,
        "posts": null
      }
    ]
  }
}

http://localhost:5000/graphql =>
{
  getAllUsers {
    id
    username
    age
    posts {
      id
      title
      content
    }
  }
}
=>
{
  "data": {
    "getAllUsers": [
      {
        "id": "1",
        "username": "Name",
        "age": 100,
        "posts": [
          {
            "id": "1",
            "title": "title",
            "content": "content"
          }
        ]
      }
    ]
  }
}

createUser =>
mutation {
  createUser(input: {username: "Alex", age: 40}) {
    id
    username
    age
  }
}
=>
{
  "data": {
    "createUser": {
      "id": "1626364405092",
      "username": "Alex",
      "age": 40
    }
  }
}

mutation {
  createUser(input: {username: "Alex", age: 40, posts: [{id: 1, title: "title", content: "content"}]}) {
    id
    username
    age
    posts {
      id
      title
      content
    }
  }
}

CLIENT:
cmd => create-react-app
https://www.apollographql.com/docs/react/get-started/
npm install @apollo/client graphql

https://www.youtube.com/watch?v=UTItsV_44K4
https://github.com/utimur/graphql-apollo-course




