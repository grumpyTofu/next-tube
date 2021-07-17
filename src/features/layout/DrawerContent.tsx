import React, { useState } from "react";
import { topDrawerConfig, middleDrawerConfig, closedDrawerConfig } from "./DrawerConfig";
import DrawerItem from "./DrawerItem";
import { Divider, List, Typography, ListItem, ListItemIcon, ListItemProps, ListItemText, Avatar } from "@material-ui/core";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { useFetchVideoCategoriesQuery } from "../../app/services/videoCategories";
import { useFetchSubscriptionsQuery } from "../../app/services/subscriptions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signOut, useSession } from "next-auth/client";
import { persistor } from "../../app/store";

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

  const [session, loading] = useSession();

  const handleSignOut = () => {
    persistor.purge();
    signOut({ redirect: false });
  };

  const videoCategoriesQuery = useFetchVideoCategoriesQuery();
  const subscriptionsQuery = useFetchSubscriptionsQuery();

  const [subscriptionsOpen, setSubscriptionsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {!open ? (
        <List>
          {closedDrawerConfig.map((item) => (
            <DrawerItem
              button
              href={item.route}
              icon={item.icon}
              text={item.text}
              style={{ paddingRight: 0, paddingLeft: 0 }}
              textVisible={false}
              listItemIconStyles={{ marginTop: "4px", marginBottom: "4px", justifyContent: "center", width: "100%" }}
              key={item.text}
            />
          ))}
        </List>
      ) : (
        <>
          <List>
            {topDrawerConfig.map((item) => (
              <DrawerItem
                button
                href={item.route}
                icon={item.icon}
                text={item.text}
                style={isMedium ? { paddingLeft: "24px" } : {}}
                key={item.text}
              />
            ))}
          </List>
          <Divider />
          <List>
            {middleDrawerConfig.map((item) => (
              <DrawerItem
                button
                href={item.route}
                icon={item.icon}
                text={item.text}
                style={isMedium ? { paddingLeft: "24px" } : {}}
                key={item.text}
              />
            ))}
          </List>
          {!subscriptionsQuery.isFetching && subscriptionsQuery.data && (
            <>
              <Divider />
              <Typography style={{ marginBottom: "1rem", paddingLeft: ".5rem" }}>Subscriptions</Typography>
              {subscriptionsQuery.data.items.slice(0, 6).map((subscription) => (
                <DrawerItem
                  button
                  href={`https://youtube.com/channel/${subscription.snippet.resourceId.channelId}`}
                  text={subscription.snippet.title}
                  style={isMedium ? { paddingLeft: "24px" } : {}}
                  external
                  avatar={subscription.snippet.thumbnails.high.url}
                  key={subscription.id}
                />
              ))}
              {subscriptionsOpen &&
                subscriptionsQuery.data.items
                  .slice(7)
                  .map((subscription) => (
                    <DrawerItem
                      button
                      href={`https://youtube.com/channel/${subscription.snippet.resourceId.channelId}`}
                      text={subscription.snippet.title}
                      style={isMedium ? { paddingLeft: "24px" } : {}}
                      external
                      avatar={subscription.snippet.thumbnails.high.url}
                      key={subscription.id}
                    />
                  ))}
              {subscriptionsQuery.data.items.length > 7 && (
                <ListItem button onClick={() => setSubscriptionsOpen(!subscriptionsOpen)}>
                  <ListItemIcon style={{ marginTop: "4px", marginBottom: "4px" }}>
                    {!subscriptionsOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </ListItemIcon>
                  <ListItemText primary={!subscriptionsOpen ? `Show ${subscriptionsQuery.data.items.slice(7).length} more` : "Show less"} />
                </ListItem>
              )}
            </>
          )}
          {!videoCategoriesQuery.isFetching && videoCategoriesQuery.data && (
            <>
              <Divider />
              <Typography style={{ marginBottom: "1rem", paddingLeft: ".5rem" }}>More From Next Tube</Typography>
              {videoCategoriesQuery.data.items.map((category) => (
                <DrawerItem
                  button
                  href={`/explore/${category.id}`}
                  text={category.snippet.title}
                  style={isMedium ? { paddingLeft: "24px" } : {}}
                  key={category.id}
                />
              ))}
            </>
          )}
          <Divider />
          <DrawerItem
            button
            onClick={handleSignOut}
            text="Sign Out"
            icon={<ExitToAppIcon />}
            style={isMedium ? { paddingLeft: "24px", marginBottom: "2rem" } : {}}
          />
        </>
      )}
    </div>
  );
};

export default DrawerContent;
