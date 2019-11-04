import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// Contexts
import { LocalizationProvider } from './state/localization/context';
import { MenuProvider } from './state/menu/context';
import { ApplicationProvider } from './state/application/context';

// UI Components
import Startup from './Startup';
import Menu from './components/Menu';

// Pages
import Leagues from './pages/Leagues/Leagues';
import League from './pages/League/League';
import Team from './pages/Team/Team';

const authLink = setContext((_, { headers }) => {
  // TODO: resolve auth token (in case is neccesary)
  const token = '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URL
});
const client = new ApolloClient({
  cache,
  link: authLink.concat(link)
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <LocalizationProvider>
      <MenuProvider>
        <ApplicationProvider>
          <Startup>
            <Router>
              <div id="app">
                <Menu />
                <Switch>
                  <Route path="/" exact component={Leagues} />
                  <Route path="/league/:leagueId?" component={League} />
                  <Route path="/team/:teamId?" component={Team} />
                  {/* <Route component={NotFound} /> */}
                </Switch>
              </div>
            </Router>
          </Startup>
        </ApplicationProvider>
      </MenuProvider>
    </LocalizationProvider>
  </ApolloProvider>
);

export default App;
