const express = require('express')
require('dotenv').config()
const cors = require('cors')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

const app = express();

//connect to database
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development', //the tool used in development
}))

app.listen(port, console.log(`Server running on port ${port}`))
