import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

export interface IDrawerItem {
  text: string;
  icon: React.ReactElement<any, any>;
  route: string;
}

export const topDrawerConfig: IDrawerItem[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
    route: "/",
  },
  {
    text: "Explore",
    icon: <ExploreIcon />,
    route: "/explore",
  },
  {
    text: "Subscriptions",
    icon: <SubscriptionsIcon />,
    route: "subscriptions",
  },
];

export const middleDrawerConfig: IDrawerItem[] = [
  {
    text: "Library",
    icon: <VideoLibraryIcon />,
    route: "library",
  },
  {
    text: "History",
    icon: <HistoryIcon />,
    route: "history",
  },
  {
    text: "Your Videos",
    icon: <OndemandVideoIcon />,
    route: "myVideos",
  },
  {
    text: "Watch Later",
    icon: <WatchLaterIcon />,
    route: "watchLater",
  },
  {
    text: "Liked Videos",
    icon: <ThumbUpIcon />,
    route: "liked",
  },
];

export const closedDrawerConfig: IDrawerItem[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
    route: "/",
  },
  {
    text: "Explore",
    icon: <ExploreIcon />,
    route: "explore",
  },
  {
    text: "Subscriptions",
    icon: <SubscriptionsIcon />,
    route: "subscription",
  },
  {
    text: "Library",
    icon: <VideoLibraryIcon />,
    route: "library",
  },
];
