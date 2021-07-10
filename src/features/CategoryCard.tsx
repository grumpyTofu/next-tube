import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: ".75rem",
      "& :hover": {
        backgroundColor: theme.palette.common.black,
      },
    },
    cardContent: {
      padding: "1.5rem",
    },
    media: {
      height: 32,
      width: 32,
      marginBottom: '1rem'
    },
    text: {
      fontWeight: "bold",
    },
  })
);

export interface CategoryCardProps {
  image: string;
  title: string;
  text: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, text }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.cardContent}>
        <CardMedia className={classes.media} image={image} title={title} />
        <Typography variant="h6" className={classes.text}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
