import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

interface DrawerItem {
  text: string;
  icon: React.ReactElement<any, any>;
}

export const topDrawerConfig: DrawerItem[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
  },
  {
    text: "Explore",
    icon: <ExploreIcon />,
  },
  {
    text: "Subscriptions",
    icon: <SubscriptionsIcon />,
  },
];

export const middleDrawerConfig: DrawerItem[] = [
  {
    text: "Library",
    icon: <VideoLibraryIcon />,
  },
  {
    text: "History",
    icon: <HistoryIcon />,
  },
  {
    text: "Your Videos",
    icon: <OndemandVideoIcon />,
  },
  {
    text: "Watch Later",
    icon: <WatchLaterIcon />,
  },
  {
    text: "Liked Videos",
    icon: <ThumbUpIcon />,
  },
];

export const closedDrawerConfig: DrawerItem[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
  },
  {
    text: "Explore",
    icon: <ExploreIcon />,
  },
  {
    text: "Subscriptions",
    icon: <SubscriptionsIcon />,
  },
  {
    text: "Library",
    icon: <VideoLibraryIcon />,
  },
];
