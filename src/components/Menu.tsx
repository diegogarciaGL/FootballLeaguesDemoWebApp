import React, { FunctionComponent, MouseEvent } from 'react';
import { RootState, selectors, actions } from '../store';
import { connect } from 'react-redux';
import { Language } from '../graphql/generated/types';
import { makeStyles } from '@material-ui/core/styles';

// UI components
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

// Custom components
import LeaguesList from './LeaguesList';

// Icons
import CloseIcon from '@material-ui/icons/Close';

const mapStateToProps = (state: RootState) => ({
  open: state.menu.open,
  currentLanguageId: state.localization.languageId,
  languages: state.localization.languages,
  showLeaguesSecondaryList: state.application.showLeaguesSecondaryList,
  showLeaguesOnMenu: state.application.showLeaguesOnMenu,
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  toggleMenu: () => actions.menu.toggleMenu(),
  toggleLeaguesSecondaryList: () =>
    actions.application.toggleLeaguesSecondaryList(),
  toggleLeaguesOnMenu: () => actions.application.toggleLeaguesOnMenu(),
  updateLanguage: (languageId: string) =>
    actions.localization.updateLanguage(languageId)
};

const useStyles = makeStyles({
  list: {
    width: 250
  },
  closeButton: {
    marginLeft: 'auto',
    order: 2
  }
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Menu: FunctionComponent<Props> = ({
  open,
  localize,
  currentLanguageId,
  languages,
  toggleMenu,
  updateLanguage,
  showLeaguesSecondaryList,
  toggleLeaguesSecondaryList,
  showLeaguesOnMenu,
  toggleLeaguesOnMenu
}) => {
  const classes = useStyles();

  const handleDrawerClose = () => {
    toggleMenu();
  };

  const onLanguageClick = (e: MouseEvent, language: Language) => {
    updateLanguage(language.languageId);
    toggleMenu();
  };

  const onShowLeaguesSecondaryListClick = () => {
    toggleLeaguesSecondaryList();
  };

  const onShowLeaguesOnMenuClick = () => {
    toggleLeaguesOnMenu();
  };

  return (
    <SwipeableDrawer open={open} onOpen={toggleMenu} onClose={toggleMenu}>
      <Toolbar>
        <Typography>{localize('components.mainMenu.language')}</Typography>
        <IconButton
          onClick={handleDrawerClose}
          color="inherit"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List className={classes.list}>
        {languages.map(l => (
          <ListItem button key={l._id} onClick={e => onLanguageClick(e, l)}>
            <ListItemText primary={l.name} />
            <ListItemIcon>
              <Checkbox
                edge="end"
                checked={l.languageId === currentLanguageId}
              />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className={classes.list}>
        <ListItem
          button
          key={'showLeaguesSecondaryList'}
          onClick={onShowLeaguesSecondaryListClick}
        >
          <ListItemText
            primary={localize('components.mainMenu.showLeaguesSecondaryList')}
          />
          <ListItemIcon>
            <Checkbox edge="end" checked={showLeaguesSecondaryList} />
          </ListItemIcon>
        </ListItem>
        <ListItem
          button
          key={'showLeaguesOnMenu'}
          onClick={onShowLeaguesOnMenuClick}
        >
          <ListItemText
            primary={localize('components.mainMenu.showLeaguesOnMenu')}
          />
          <ListItemIcon>
            <Checkbox edge="end" checked={showLeaguesOnMenu} />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      {showLeaguesOnMenu && <LeaguesList fetchPolicy={'cache-only'} />}
    </SwipeableDrawer>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
