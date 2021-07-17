import React from "react";
import Link from "next/link";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const categoryIconDict: Record<string, string> = {
  Trending: "/trending_color_64.png",
  Music: "/music_color_64.png",
  Sports: "/sports_color_64.png",
  Gaming: "/gaming_color_64.png",
  "News & Politics": "/news_color_64.png",
  "Howto & Style": "/fashion_and_beauty_color_64.png",
  Education: "/learning_color_64_v1.png",
};

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
      marginBottom: "1rem",
    },
    text: {
      fontWeight: "bold",
    },
  })
);

export interface CategoryCardProps {
  title: string;
  id?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, id = null }) => {
  const image = Object.keys(categoryIconDict).includes(title) ? categoryIconDict[title] : "/live_color_64.png";
  const classes = useStyles();
  return (
    <Link href={id ? `/explore/${id}` : "/explore"}>
      <Card className={classes.card} elevation={0}>
        <CardContent className={classes.cardContent}>
          <CardMedia className={classes.media} image={image} title={title} />
          <Typography variant="h6" className={classes.text}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
