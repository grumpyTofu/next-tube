import { ListItem, ListItemIcon, ListItemProps, ListItemText } from "@material-ui/core";

export interface IDrawerItem {
  text: string;
  icon: React.ReactElement<any, any>;
  route: string;
}

interface DrawerItemProps extends ListItemProps {
  item: IDrawerItem;
  textVisible?: boolean;
  listItemIconStyles?: React.CSSProperties;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ item, textVisible = true, listItemIconStyles, children, ...props }) => (
  <ListItem {...(props as any)}>
    <ListItemIcon style={listItemIconStyles}>{item.icon}</ListItemIcon>
    {textVisible && <ListItemText primary={item.text} />}
  </ListItem>
);

export default DrawerItem;
