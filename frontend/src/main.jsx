import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
    uri: 'http://localhost:8000/graphql/',
    credentials: 'include',
  });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);
