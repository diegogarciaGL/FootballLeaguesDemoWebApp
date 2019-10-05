import React, { Component } from 'react';
import { Query } from '@apollo/react-components';
import { WatchQueryFetchPolicy } from 'apollo-client';
import { LEAGUES_QUERY, LeaguesQueryData } from '../graphql/queries/Leagues';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

type Props = {
  fetchPolicy?: WatchQueryFetchPolicy;
};

class LeaguesList extends Component<Props> {
  render() {
    const { fetchPolicy } = this.props;
    return (
      <Query<LeaguesQueryData> query={LEAGUES_QUERY} fetchPolicy={fetchPolicy}>
        {({ data }) => (
          <List>
            {data &&
              data.leagues.map(l => (
                <ListItem key={l._id}>
                  <ListItemAvatar>
                    <Avatar alt="logo" />
                  </ListItemAvatar>
                  <ListItemText primary={l.name} secondary={l.country} />
                </ListItem>
              ))}
          </List>
        )}
      </Query>
    );
  }
}

export default LeaguesList;
