const express = require("express");
require('dotenv').config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const app = express();
const errorHandler = require("./middlewares/ErrorHandler");
const connectDB = require("./config/DBConnection");
const cors = require("cors");
const bodyParser = require("body-parser");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { contextMiddleware } = require("./middlewares/ValidateTokenHandler");

// connectDB();

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
        "Message": "Node JS Backend Application Running on EC2 AWS :)",
        "GitHub_Actions": "This application is deployed using GitHub Actions Workflow :)",
        "Environment_Title": process.env.ENVIRONMENT_TITLE,
        "MongoDB_Connection_String_Secret_Key": process.env.MONGODB_CONNECTION_STRING
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
