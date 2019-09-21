import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
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

const LeaguesList: FC<Props> = ({ fetchPolicy }) => {
  const { data } = useQuery<LeaguesQueryData>(LEAGUES_QUERY, {
    fetchPolicy
  });

  return (
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
  );
};

export default LeaguesList;
