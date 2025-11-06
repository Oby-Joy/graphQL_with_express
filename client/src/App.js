import Header from "./components/Header";
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import Clients from "./components/Clients";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8000/graphql' }),
  //cache: new InMemoryCache(),
  cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
            <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
