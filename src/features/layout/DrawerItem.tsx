import Link from "next/link";
import { ListItem, ListItemIcon, ListItemProps, ListItemText } from "@material-ui/core";

interface DrawerItemProps extends ListItemProps {
  icon?: React.ReactElement<any, any>;
  text: string;
  textVisible?: boolean;
  listItemIconStyles?: React.CSSProperties;
  href: string;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ icon, text, href, textVisible = true, listItemIconStyles, children, ...props }) => (
  <Link href={href}>
    <ListItem component="a" {...(props as any)}>
      {icon && <ListItemIcon style={listItemIconStyles}>{icon}</ListItemIcon>}
      {textVisible && <ListItemText primary={text} />}
    </ListItem>
  </Link>
);

export default DrawerItem;
