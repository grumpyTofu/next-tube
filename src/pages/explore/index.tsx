import React from "react";
import { NextPage } from "next";
import { CardMedia, Grid, Card, Divider, Typography, CardContent } from "@material-ui/core";
import CategoryCard from "../../features/CategoryCard";
import { useFetchVideosByCategoryQuery } from "../../app/services/videos";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useFetchVideoCategoriesQuery } from "../../app/services/videoCategories";

interface ExplorePageProps {}

const ExplorePage: NextPage<ExplorePageProps> = () => {
  const videoCategoriesQuery = useFetchVideoCategoriesQuery();
  const { data, isFetching } = useFetchVideosByCategoryQuery(undefined);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Grid container spacing={1} style={{ marginBottom: "2rem" }}>
          {!videoCategoriesQuery.isFetching && videoCategoriesQuery.data && (
            <>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CategoryCard title="Trending" />
              </Grid>
              {videoCategoriesQuery.data.items.map((item) => {
                const title = item.snippet.title;
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <CategoryCard title={title} id={item.id} />
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
        <Divider variant="fullWidth" style={{ backgroundColor: theme.palette.primary.light, height: "3px", marginBottom: "2rem" }} />
        <Typography variant="h6" style={{ marginBottom: "1rem" }}>
          Trending Videos
        </Typography>
        {!isFetching && data && (
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
                        <Typography variant="body2" style={{ marginBottom: "1rem" }}>
                          {video.snippet.channelTitle} • {video.statistics.viewCount} views • {video.snippet.publishedAt}
                        </Typography>
                        <Typography style={{ maxHeight: video.snippet.thumbnails.medium.height / 2 }}>{video.snippet.description}</Typography>
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
