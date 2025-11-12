import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

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
        <Router>
          <Header />
          <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Routes>          
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
