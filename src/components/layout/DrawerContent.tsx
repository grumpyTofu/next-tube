import React from "react";
import { topDrawerConfig, middleDrawerConfig, closedDrawerConfig } from "./ListItems";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

interface DrawerContentProps {
  open: boolean;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ open }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {!open ? (
        <List>
          {closedDrawerConfig.map((item) => (
            <ListItem button key={item.text} style={{ paddingRight: 0, paddingLeft: 0 }}>
              <ListItemIcon style={{ marginTop: "4px", marginBottom: "4px", justifyContent: "center", width: "100%" }}>{item.icon}</ListItemIcon>
            </ListItem>
          ))}
        </List>
      ) : (
        <>
          <List>
            {topDrawerConfig.map((item) => (
              <ListItem button key={item.text} style={isMedium ? { paddingLeft: "24px" } : {}}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {middleDrawerConfig.map((item) => (
              <ListItem button key={item.text} style={isMedium ? { paddingLeft: "24px" } : {}}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <div>Subscriptions</div>
        </>
      )}
    </div>
  );
};

export default DrawerContent;
