import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TEAM_QUERY, TeamQueryData } from '../../graphql/queries/Teams';
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

type Props = RouteComponentProps<{ teamId: string }>;

const Team: FC<Props> = ({
  match: {
    params: { teamId }
  },
  history
}) => {
  const localizationContext = useContext(LocalizationContext);
  const {
    selectors: { localize }
  } = localizationContext;
  const { loading, error, data } = useQuery<TeamQueryData>(TEAM_QUERY, {
    variables: { teamId }
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>Error</p>;
  if (data && data.team) {
    const { team } = data;
    const { league, players } = team;
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              aria-label="settings"
              color="inherit"
              edge="start"
              onClick={() => {
                league && history.push(`/league/${league._id}`);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">{localize('pages.team.title')}</Typography>
          </Toolbar>
        </AppBar>
        <List>
          {players &&
            players.map(p => (
              <ListItem key={p._id}>
                <ListItemAvatar>
                  <Avatar alt="logo" />
                </ListItemAvatar>
                <ListItemText
                  primary={p.name}
                  secondary={
                    p.position
                      ? `${p.nationality}, ${p.position}`
                      : p.nationality
                  }
                />
              </ListItem>
            ))}
        </List>
      </>
    );
  }
  return <></>;
};

export default withRouter(Team);
