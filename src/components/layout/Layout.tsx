import React, { useState } from "react";

import { CssBaseline, Drawer } from "@material-ui/core";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import clsx from "clsx";
import { useEffect } from "react";
import DrawerContent from "./DrawerContent";
import Navbar from "./Navbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 1,
      },
      [theme.breakpoints.up("md")]: {
        width: theme.spacing(9) + 1,
      },
      [theme.breakpoints.up("lg")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      backgroundColor: theme.palette.primary.main,
    },
    drawerMini: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      width: theme.spacing(7) + 1,
      backgroundColor: theme.palette.primary.main,
    },
    drawerOpenMini: {
      width: theme.spacing(7) + 1,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      //   width: theme.spacing(7) + 1,
      [theme.breakpoints.down("xs")]: {
        display: "none",
        width: 0,
      },
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 1,
      },
      [theme.breakpoints.up("md")]: {
        width: theme.spacing(9) + 1,
      },
    },
    // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

interface LayoutProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Layout: React.FC<LayoutProps> = ({ children, window }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMini = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (isLarge && !open) {
      setOpen(true);
    } else if (!isLarge && open) {
      setOpen(false);
    }
  }, [isLarge]);

  useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [isMobile]);

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} />
      <Drawer
        container={isMobile ? container : undefined}
        className={
          isMini
            ? isMobile
              ? undefined
              : clsx({
                  [classes.drawerOpenMini]: open,
                  [classes.drawerClose]: !open,
                })
            : clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })
        }
        classes={
          isMobile
            ? {
                paper: classes.drawerPaper,
              }
            : isMini
            ? {
                paper: clsx(classes.drawerMini, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }
            : {
                paper: clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }
        }
        variant={isMobile ? "temporary" : "permanent"}
        onClose={handleDrawerToggle}
        open={isMobile ? mobileOpen : open}
        ModalProps={
          isMobile
            ? {
                keepMounted: true, // Better open performance on mobile.
              }
            : undefined
        }
        anchor={theme.direction === "rtl" ? "right" : "left"}
      >
        <DrawerContent open={isMobile ? mobileOpen : open} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
