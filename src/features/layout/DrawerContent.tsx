import React from "react";
import { topDrawerConfig, middleDrawerConfig, closedDrawerConfig } from "./DrawerConfig";
import DrawerItem from "./DrawerItem";
import { Divider, List, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { useFetchVideoCategoriesQuery } from "../../app/services/videoCategories";

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

  const { data, isFetching } = useFetchVideoCategoriesQuery();

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
          <Divider />
          <div>Subscriptions</div>
          {!isFetching && data && (
            <>
              <Divider />
              <Typography style={{ marginBottom: '1rem', paddingLeft: '.5rem'}}>More From Next Tube</Typography>
              {data.items.map((category) => (
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
        </>
      )}
    </div>
  );
};

export default DrawerContent;
