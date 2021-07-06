import React from "react";

import { makeStyles, createStyles, AppBar, Toolbar, IconButton, Typography, Avatar, Theme } from "@material-ui/core";
import { signOut } from "next-auth/client";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "../SearchBar";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      "& .MuiSvgIcon-root": {
        fill: "white",
      },
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

interface NavbarProps {
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMobile, handleDrawerToggle }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5">Next Tube</Typography>
        <div className={classes.spacer} />
        {isMobile ? (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ) : (
          <SearchBar />
        )}
        <div className={classes.spacer} />
        <IconButton onClick={() => signOut({ redirect: false })}>
          <Avatar>A</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
