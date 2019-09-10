import React, { FunctionComponent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { RootState, selectors, actions } from '../../store';
import { LEAGUES_QUERY, LeaguesQueryData } from '../../graphql/queries/Leagues';
import { League } from '../../graphql/generated/types';
import { withRouter, RouteComponentProps } from 'react-router';

// UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  toggleMenu: () => actions.menu.toggleMenu()
};

type Props = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{}> &
  typeof mapDispatchToProps;

const Home: FunctionComponent<Props> = ({ history, localize, toggleMenu }) => {
  function onLeagueClick(e: MouseEvent, league: League) {
    e.stopPropagation();
    history.push(`/league/${league._id}`);
  }

  function handleDrawerOpen() {
    toggleMenu();
  }

  const { loading, error, data } = useQuery<LeaguesQueryData>(LEAGUES_QUERY);
  if (loading) return <LinearProgress />;
  if (error) return <p>Error</p>;
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{localize('pages.home.title')}</Typography>
        </Toolbar>
      </AppBar>
      <List>
        {data &&
          data.leagues.map(l => (
            <ListItem
              key={l._id}
              button
              onClick={e => {
                onLeagueClick(e, l);
              }}
            >
              <ListItemAvatar>
                <Avatar alt="logo" />
              </ListItemAvatar>
              <ListItemText primary={l.name} secondary={l.country} />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
