import React, { FunctionComponent, MouseEvent } from "react";
import { RootState, selectors, actions } from "../store";
import { connect } from "react-redux";
import { Language } from "../graphql/generated/types";
import { makeStyles } from '@material-ui/core/styles';

// UI components
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

// Icons
import CloseIcon from "@material-ui/icons/Close";

const mapStateToProps = (state: RootState) => ({
  open: state.menu.open,
  languages: state.localization.languages,
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = ({
  toggleMenu: () => actions.menu.toggleMenu(),
  updateLanguage: (languageId: string) => actions.localization.updateLanguage(languageId)
});

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Menu: FunctionComponent<Props> = ({ open, localize, languages, toggleMenu, updateLanguage }) => {
  const classes = useStyles();

  function handleDrawerClose() {
    toggleMenu();
  }

  function onLanguageClick(e: MouseEvent, language: Language) {
    updateLanguage(language.languageId);
    toggleMenu();
  }

  return (
    <SwipeableDrawer open={open} onOpen={toggleMenu} onClose={toggleMenu}>
      <Toolbar>
        <Typography>{localize("components.mainMenu.language")}</Typography>
        <IconButton onClick={handleDrawerClose} color="inherit" className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List className={classes.list}>
        {languages.map(l => (
          <ListItem button key={l._id} onClick={e => onLanguageClick(e, l)}>
            <ListItemText primary={l.name} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
