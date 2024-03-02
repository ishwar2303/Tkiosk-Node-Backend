const express = require("express");
require('dotenv').config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const app = express();
const errorHandler = require("./middlewares/ErrorHandler");
const connectDB = require("./config/DBConnection");
const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || 'qa'}`;
dotenv.config({ path: envFile })
const cors = require("cors");
const bodyParser = require("body-parser");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { contextMiddleware } = require("./middlewares/ValidateTokenHandler");

// connectDB();
console.log('Running Version 12.0 -x-x-x-x-x-x-')

//app.use(express.json(), cors(), bodyParser.json());
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  app.use(cors(), bodyParser.json());

  await server.start();
  app.get(
    "/",
    (req, res) => {
      res.send({
        "Message": "Working Application Wohooooo!",
        "environment": process.env.ENVIRONMENT_TITLE,
        "Pipeline": "Deployed through Github Actions"
      })
    }
  )
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: contextMiddleware,
    })
  );

  const port = process.env.PORT ? process.env.PORT : 5000;
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
};

startServer();

// app.use('/api/users',require("./Routes/UserRoutes"));
// app.use('/api/tweets',require("./Routes/TweetRoutes"));
// app.use('/api/friendship',require("./Routes/FriendshipRoutes"));
// app.use("/api/comments", require("./Routes/CommentRoutes"));
// app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`);
// });
