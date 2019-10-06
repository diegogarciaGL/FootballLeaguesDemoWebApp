import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from '@apollo/react-components';
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
import { RootState, selectors } from '../../store';

type State = {
  isLoading: boolean;
};

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

type Props = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ teamId: string }>;

class Team extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
  };

  onQueryCompleted = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const {
      history,
      localize,
      match: {
        params: { teamId }
      }
    } = this.props;
    return (
      <Query<TeamQueryData>
        query={TEAM_QUERY}
        variables={{ teamId }}
        onError={this.onQueryCompleted}
        onCompleted={this.onQueryCompleted}
      >
        {({ data }) => (
          <>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  aria-label="settings"
                  color="inherit"
                  edge="start"
                  onClick={() => {
                    data &&
                      data.team &&
                      data.team.league &&
                      history.push(`/league/${data.team.league._id}`);
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">
                  {localize('pages.team.title')}
                </Typography>
              </Toolbar>
            </AppBar>
            {isLoading && <LinearProgress />}
            <List>
              {data &&
                data.team &&
                data.team.players &&
                data.team.players.map(p => (
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
        )}
      </Query>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Team));
