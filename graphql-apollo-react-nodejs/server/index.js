const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
require('dotenv').config();

let users = [{ id: 1, username: "Name", age: 100, posts: [{ id: 1, title: "title", content: "content" }] }];
//let users = [];

const app = express();
app.use(cors());

const createUser = (input) => {
    const id = Date.now();
    const newUser = { id, ...input };
    //console.log("createUser: ", newUser);
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        //console.log("getAllUsers: ", users);
        return users;
    },
    getUser: ({ id }) => {
        return users.find(user => user.id == id);
    },
    createUser: ({ input }) => {//input = username + age + posts
        const user = createUser(input);
        //console.log("root.createUser: ", user);
        users.push(user);
        return user;
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true, //localhost:3000/graphql
    schema,
    rootValue: root
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});