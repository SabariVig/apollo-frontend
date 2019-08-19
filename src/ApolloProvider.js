import React from "react";
import App from "./App";

import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";

const link = createHttpLink({
  uri: "https://trwyz.sse.codesandbox.io/"
});

const client = new ApolloClient({ link, cache: new InMemoryCache() });

export default (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
