import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TEAMS_QUERY, TeamsQueryData } from '../../graphql/queries/Teams';
import { withRouter, RouteComponentProps } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LinearProgress from '@material-ui/core/LinearProgress';

// Contexts
import { LocalizationContext } from '../../state/localization/context';

type Props = RouteComponentProps<{ leagueId: string }>;

const League: FC<Props> = ({
  match: {
    params: { leagueId }
  },
  history
}) => {
  const localizationContext = useContext(LocalizationContext);
  const {
    selectors: { localize }
  } = localizationContext;
  const { loading, error, data } = useQuery<TeamsQueryData>(TEAMS_QUERY, {
    variables: { leagueId }
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>Error</p>;
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="settings"
            color="inherit"
            edge="start"
            onClick={() => {
              history.push('/');
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">{localize('pages.league.title')}</Typography>
        </Toolbar>
      </AppBar>
      <List>
        {data &&
          data.teams.map(t => (
            <ListItem
              key={t._id}
              button
              onClick={() => {
                history.push(`/team/${t._id}`);
              }}
            >
              <ListItemAvatar>
                <Avatar alt="logo" />
              </ListItemAvatar>
              <ListItemText primary={t.name} />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default withRouter(League);
