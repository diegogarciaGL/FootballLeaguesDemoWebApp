import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from '@apollo/react-components';
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
import { RootState, selectors } from '../../store';

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

type State = {
  isLoading: boolean;
};

type Props = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ leagueId: string }>;

class League extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  onQueryCompleted = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const {
      match: {
        params: { leagueId }
      },
      history,
      localize
    } = this.props;
    const { isLoading } = this.state;
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
            <Typography variant="h6">
              {localize('pages.league.title')}
            </Typography>
          </Toolbar>
        </AppBar>
        {isLoading && <LinearProgress />}
        <List>
          <Query<TeamsQueryData>
            query={TEAMS_QUERY}
            variables={{ leagueId }}
            onError={this.onQueryCompleted}
            onCompleted={this.onQueryCompleted}
          >
            {({ data }) =>
              data && data.teams ? (
                <>
                  {data.teams.map(t => (
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
                </>
              ) : (
                <></>
              )
            }
          </Query>
        </List>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(League));
