import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import logger from "morgan";
import schema from "./schema";
import isAuth from "./middlewares/isAuth";

const PORT =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_PORT
    : process.env.DEVELOP_PORT;
const SERVICE_NAME = process.env.SERVICE_NAME;

const startApolloServer = async (schema) => {
  const app = express();
  const httpServer = createServer(app);

  const apollo = new ApolloServer({
    schema,
    context: async (ctx) => await isAuth({ ctx }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
              stopCron();
            },
          };
        },
      },
    ],
    // Error 발생 시, client에 stacktrace 제공 disable
    debug: process.env.NODE_ENV !== "production",
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: (req) => {},
    },
    { server: httpServer, path: apollo.graphqlPath }
  );

  await apollo.start();

  app.use(express.json());
  app.use(graphqlUploadExpress());

  app.use(logger("dev"));

  apollo.applyMiddleware({
    app,
    cors: {
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    },
  });

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(
    `your ${SERVICE_NAME} server is running on port http://localhost:${PORT}/graphql`
  );
};

startApolloServer(schema);
