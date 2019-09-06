import React, { FunctionComponent, MouseEvent, useState } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { RootState, selectors, actions } from "../../store";
import { LEAGUES_QUERY, LeaguesQueryData } from "../../graphql/queries/Leagues";
import { League, Language } from "../../graphql/generated/types";
import { withRouter, RouteComponentProps } from "react-router";

// UI components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

// Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";

// Styles related
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./HomeStyles";
import { useTheme } from "@material-ui/core/styles";

const mapStateToProps = (state: RootState) => ({
  languages: state.localization.languages,
  localize: (key: string) => selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  updateLanguage: (languageId: string) =>
    actions.localization.updateLanguage(languageId)
};

type Props = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{}> &
  typeof mapDispatchToProps;

const Home: FunctionComponent<Props> = ({
  history,
  languages,
  localize,
  updateLanguage
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  function onLeagueClick(e: MouseEvent, league: League) {
    e.stopPropagation();
    history.push(`/league/${league._id}`);
  }

  function onLanguageClick(e: MouseEvent, language: Language) {
    updateLanguage(language.languageId);
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const { loading, error, data } = useQuery<LeaguesQueryData>(LEAGUES_QUERY);
  if (loading) return <LinearProgress />;
  if (error) return <p>Error</p>;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{localize('pages.home.title')}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar>
          <Typography>
            {localize('components.mainMenu.language')}
          </Typography>
          <IconButton onClick={handleDrawerClose} color="inherit" className={classes.drawerButton}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Toolbar>
        {/* <div className={classes.drawerHeader}>
          <Typography className={classes.drawerHeaderTitle}>
            {localize('components.mainMenu.language')}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div> */}
        <Divider />
        <List>
          {languages.map(l => (
            <ListItem button key={l._id} onClick={e => onLanguageClick(e, l)}>
              <ListItemText primary={l.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
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
      </main>
    </div>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
