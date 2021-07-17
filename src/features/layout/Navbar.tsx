import React, { useState } from "react";

import { makeStyles, createStyles, AppBar, Toolbar, IconButton, Typography, Avatar, Theme, Divider } from "@material-ui/core";
import { signOut, useSession } from "next-auth/client";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "../SearchBar";
import { persistor } from "../../app/store";

import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
      [theme.breakpoints.down("sm")]: {
        marginLeft: -theme.spacing(2.5),
      },
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

const StyledMenu = withStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
  },
}))((props: MenuProps) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface NavbarProps {
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMobile, handleDrawerToggle }) => {
  const classes = useStyles();
  const [session, loading] = useSession();

  const handleSignOut = () => {
    persistor.purge();
    signOut({ redirect: false });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5">Next Tube</Typography>
        <div className={classes.spacer} />
        {/* isMobile ? (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ) : (
          <SearchBar />
        ) */}
        <div className={classes.spacer} />
        <IconButton onClick={handleClick}>
          <Avatar src={session!.user!.image as string}></Avatar>
        </IconButton>
        <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <div style={{ display: "flex", width: "100%", padding: ".5rem" }}>
            <ListItemIcon>
              <Avatar src={session!.user!.image as string}></Avatar>
            </ListItemIcon>
            <ListItemText primary={session!.user!.name as string} />
          </div>
          <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
          <StyledMenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </StyledMenuItem>
        </StyledMenu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
