import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Startup from './Startup';

// Pages
import Home from './pages/Home/Home';
import League from './pages/League/League';
import Team from './pages/Team/Team';

// Redux store
import store from './store';

const authLink = setContext((_, { headers }) => {
  // TODO: resolve auth token (in case is neccesary)
  const token = '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URL
})
const client = new ApolloClient({
  cache,
  link: authLink.concat(link)
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Startup>
        <Router>
          <div id="app">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/league/:leagueId?" component={League} />
            <Route path="/team/:teamId?" component={Team} />
            {/* <Route component={NotFound} /> */}
          </Switch>
          </div>
        </Router>
      </Startup>
    </Provider>
  </ApolloProvider>
)

export default App;
