import Link from "next/link";
import { ListItem, ListItemIcon, ListItemProps, ListItemText, Avatar, Button } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
    link: {
      textDecoration: "none",
      "&:hover,:active,:focus,:visited": {
        textDecoration: "none",
      },
    },
    text: {
      "& span": {
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  })
);

interface DrawerItemProps extends ListItemProps {
  icon?: React.ReactElement<any, any>;
  text: string;
  textVisible?: boolean;
  listItemIconStyles?: React.CSSProperties;
  href?: string;
  external?: boolean;
  avatar?: string;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  icon,
  text,
  href,
  avatar,
  external = false,
  textVisible = true,
  listItemIconStyles,
  children,
  ...props
}) => {
  const classes = useStyles();
  return external ? (
    <a href={href} target="_blank" rel="no referrer" className={classes.link}>
      <ListItem {...(props as any)}>
        {avatar && (
          <Avatar className={classes.small} style={listItemIconStyles} src={avatar}>
            {!avatar && text[0]}
          </Avatar>
        )}
        {textVisible && <ListItemText primary={text} className={classes.text} />}
        {icon && <ListItemIcon style={listItemIconStyles}>{icon}</ListItemIcon>}
      </ListItem>
    </a>
  ) : href ? (
    <Link href={href}>
      <ListItem component="a" {...(props as any)}>
        {icon && <ListItemIcon style={listItemIconStyles}>{icon}</ListItemIcon>}
        {textVisible && <ListItemText primary={text} />}
      </ListItem>
    </Link>
  ) : (
      <ListItem component={Button} {...(props as any)}>
        {icon && <ListItemIcon style={listItemIconStyles}>{icon}</ListItemIcon>}
        {textVisible && <ListItemText primary={text} />}
      </ListItem>
  );
};

export default DrawerItem;
