import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../../store';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { League } from '../../graphql/generated/types';
import { Mutation } from '@apollo/react-components';
import {
  LEAGUES_QUERY,
  NEW_LEAGUE,
  NewLeagueData,
  NewLeagueParameters
} from '../../graphql/queries/Leagues';

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

type ParamProps = {
  isOpen: boolean;
  onClose?: () => void;
  onLeagueSaved?: (league: League) => void;
  league?: League;
};

type State = {
  _id: string;
  name: string;
  country: string;
  isSavingLeague: boolean;
};

type Props = ParamProps & ReturnType<typeof mapStateToProps>;

class LeagueForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      country: '',
      isSavingLeague: false
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNameChange = (e: any) => {
    this.setState({ name: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCountryChange = (e: any) => {
    this.setState({ country: e.target.value });
  };

  onSave = (saveLeagueMutation: Function) => {
    const { name, country, _id } = this.state;
    if (name && country) {
      this.setState({ isSavingLeague: true }, () => {
        saveLeagueMutation({
          refetchQueries: [{ query: LEAGUES_QUERY }],
          variables: {
            input: {
              _id,
              name,
              country
            }
          }
        });
      });
    }
  };

  onMutationCompleted = (data: NewLeagueData) => {
    this.setState({ isSavingLeague: false }, () => {
      const { onLeagueSaved, onClose } = this.props;
      onLeagueSaved && onLeagueSaved(data.newLeague);
      onClose && onClose();
    });
  };

  render() {
    const { isOpen, onClose, localize } = this.props;
    const { isSavingLeague, name, country } = this.state;
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={isSavingLeague}
        disableEscapeKeyDown={isSavingLeague}
      >
        {isSavingLeague && <LinearProgress />}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={this.onNameChange}
            disabled={isSavingLeague}
          />
          <TextField
            margin="dense"
            id="country"
            label="Country"
            type="text"
            fullWidth
            value={country}
            onChange={this.onCountryChange}
            disabled={isSavingLeague}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" disabled={isSavingLeague}>
            {localize('buttons.cancel')}
          </Button>
          <Mutation<NewLeagueData, NewLeagueParameters>
            mutation={NEW_LEAGUE}
            onCompleted={this.onMutationCompleted}
          >
            {(saveLeagueMutation: Function) => (
              <Button
                onClick={() => this.onSave(saveLeagueMutation)}
                color="primary"
                disabled={isSavingLeague}
              >
                {localize('buttons.save')}
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps)(LeagueForm);
