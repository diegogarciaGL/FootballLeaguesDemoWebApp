import React, { FC, useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { League } from '../../graphql/generated/types';
import { useMutation } from '@apollo/react-hooks';
import {
  LEAGUES_QUERY,
  NEW_LEAGUE,
  NewLeagueData
} from '../../graphql/queries/Leagues';

// Contexts
import { LocalizationContext } from '../../state/localization/context';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onLeagueSaved?: (league: League) => void;
  league?: League;
};

const LeagueForm: FC<Props> = ({ isOpen, onClose, league, onLeagueSaved }) => {
  const localizationContext = useContext(LocalizationContext);
  const {
    selectors: { localize }
  } = localizationContext;
  const [_id] = useState<string>(league ? league._id : '');
  const [name, setName] = useState<string>(league ? league.name : '');
  const [country, setCountry] = useState<string>(league ? league.country : '');
  const [saveLeagueMutation, { loading: isSavingLeague }] = useMutation<
    NewLeagueData
  >(NEW_LEAGUE, {
    onCompleted: data => {
      onLeagueSaved && onLeagueSaved(data.newLeague);
      onClose && onClose();
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCountryChange = (e: any) => {
    setCountry(e.target.value);
  };

  const onSave = () => {
    if (name && country) {
      saveLeagueMutation({
        variables: {
          input: {
            _id,
            name,
            country
          }
        },
        refetchQueries: [{ query: LEAGUES_QUERY }]
      });
    }
  };

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
          onChange={onNameChange}
          disabled={isSavingLeague}
        />
        <TextField
          margin="dense"
          id="country"
          label="Country"
          type="text"
          fullWidth
          value={country}
          onChange={onCountryChange}
          disabled={isSavingLeague}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isSavingLeague}>
          {localize('buttons.cancel')}
        </Button>
        <Button onClick={onSave} color="primary" disabled={isSavingLeague}>
          {localize('buttons.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeagueForm;
