import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Query } from '@apollo/react-components';
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
import Grid from '@material-ui/core/Grid';

// Custom Components
import LeagueForm from '../League/LeagueForm';
import LeaguesList from '../../components/LeaguesList';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

// Styles
import './LeaguesStyles.css';

const mapStateToProps = (state: RootState) => ({
  showLeaguesSecondaryList: state.application.showLeaguesSecondaryList,
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  toggleMenu: () => actions.menu.toggleMenu()
};

type State = {
  isNewLeagueOpen: boolean;
  isLoading: boolean;
};

type Props = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{}> &
  typeof mapDispatchToProps;

class Leagues extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isNewLeagueOpen: false,
      isLoading: true
    };
  }

  onLeagueClick = (e: MouseEvent, league: League) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push(`/league/${league._id}`);
  };

  onQueryCompleted = () => {
    this.setState({ isLoading: false });
  };

  handleDrawerOpen = () => {
    const { toggleMenu } = this.props;
    toggleMenu();
  };

  onAddClick = () => {
    this.setState({ isNewLeagueOpen: true });
  };

  onNewLeagueFormClose = () => {
    this.setState({ isNewLeagueOpen: false });
  };

  onLeagueSaved = () => {
    //loadLeaguesQuery();
  };

  render() {
    const { localize, showLeaguesSecondaryList } = this.props;
    const { isNewLeagueOpen, isLoading } = this.state;
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {localize('pages.home.title')}
            </Typography>
            <div className={'grow'} />
            <IconButton
              color="inherit"
              aria-label="add league"
              onClick={this.onAddClick}
              edge="end"
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LeagueForm
          isOpen={isNewLeagueOpen}
          onClose={this.onNewLeagueFormClose}
          onLeagueSaved={this.onLeagueSaved}
        />
        {isLoading && <LinearProgress />}
        <div className={'grow'}>
          <Grid container spacing={1}>
            <Grid item xs={showLeaguesSecondaryList ? 6 : 12}>
              <Query<LeaguesQueryData>
                query={LEAGUES_QUERY}
                fetchPolicy="cache-and-network"
                onCompleted={this.onQueryCompleted}
              >
                {({ data }) => (
                  <List>
                    {data &&
                      data.leagues.map(l => (
                        <ListItem
                          key={l._id}
                          button
                          onClick={e => {
                            this.onLeagueClick(e, l);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar alt="logo" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={l.name}
                            secondary={l.country}
                          />
                        </ListItem>
                      ))}
                  </List>
                )}
              </Query>
            </Grid>
            {showLeaguesSecondaryList && (
              <Grid item xs={6}>
                <LeaguesList fetchPolicy={'cache-only'} />
              </Grid>
            )}
          </Grid>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Leagues)
);
