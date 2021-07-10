import React from "react";
import { NextPage } from "next";
import { CardMedia, Grid, Card, Divider, Typography, CardContent } from "@material-ui/core";
import CategoryCard, { CategoryCardProps } from "../features/CategoryCard";
import { useFetchTrendingVideosQuery } from "../app/services/youtube";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

const categories: CategoryCardProps[] = [
  { image: "/trending_color_64.png", title: "trending vidoes", text: "Trending" },
  { image: "/music_color_64.png", title: "music", text: "Music" },
  { image: "/gaming_color_64.png", title: "gaming", text: "Gaming" },
  { image: "/news_color_64.png", title: "news", text: "News" },
  { image: "/movies_color_64.png", title: "movies & shows", text: "Movies & Shows" },
  { image: "/fashion_and_beauty_color_64.png", title: "fashion & beauty", text: "Fashion & Beauty" },
  { image: "/learning_color_64.png", title: "learning", text: "Learning" },
  { image: "/live_color_64.png", title: "live", text: "Live" },
  { image: "/sports_color_64.png", title: "sports", text: "Sports" },
];

interface ExplorePageProps {}

const ExplorePage: NextPage<ExplorePageProps> = ({}) => {
  const { data, isFetching } = useFetchTrendingVideosQuery();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Grid container spacing={1} style={{ marginBottom: "2rem" }}>
          {categories.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.title}>
              <CategoryCard image={item.image} title={item.title} text={item.text} />
            </Grid>
          ))}
        </Grid>
        <Divider variant="fullWidth" style={{ backgroundColor: theme.palette.primary.light, height: "3px", marginBottom: "2rem" }} />
        <Typography variant="h6" style={{ marginBottom: "1rem" }}>
          Trending Videos
        </Typography>
        {data && (
          <Grid container spacing={2}>
            {data.items.map((video) => (
              <React.Fragment key={video.id}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia component="img" image={video.snippet.thumbnails.medium.url} height={video.snippet.thumbnails.medium.height} />
                  </Card>
                </Grid>
                {!isXs && (
                  <Grid item sm={6} md={8} lg={9}>
                    <Card elevation={0} style={{ maxHeight: video.snippet.thumbnails.medium.height }}>
                      <CardContent style={{ textOverflow: "ellipsis", overflow: "hidden", maxHeight: video.snippet.thumbnails.medium.height }}>
                        <Typography variant="h6">{video.snippet.title}</Typography>
                        <Typography variant="body2" style={{ marginBottom: '1rem'}}>
                          {video.snippet.channelTitle} • {video.statistics.viewCount} views • {video.snippet.publishedAt}
                        </Typography>
                        <Typography style={{ maxHeight: video.snippet.thumbnails.medium.height / 2}}>{video.snippet.description}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ExplorePage;
