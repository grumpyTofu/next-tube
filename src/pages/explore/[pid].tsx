import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CardMedia, Grid, Card, Divider, Typography, CardContent, Button } from "@material-ui/core";
import { useFetchVideosByCategoryQuery } from "../../app/services/videos";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useFetchVideoCategoriesQuery } from "../../app/services/videoCategories";

const ExploreIdPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query as Record<string, string>;

  const { category } = useFetchVideoCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      category: data?.items.find((category) => category.id === pid),
    }),
  });
  const { data, isFetching } = useFetchVideosByCategoryQuery(pid);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  console.log(category);
  return (
    <Grid container justify="center">
      {!isFetching && data && (
        <>
          <Grid item xs={12}>
            <a href={`https://youtube.com/watch?v=${data.items[0].id}`} target="_blank" rel="noreferrer">
              <CardMedia component="img" image={data.items[0].snippet.thumbnails.high.url} height={data.items[0].snippet.thumbnails.high.height} />
            </a>
          </Grid>
          <Divider variant="fullWidth" />
          <div style={{ margin: "2rem 0rem", padding: "0rem 1rem", width: "100%", display: "flex" }}>
            <Typography variant="h4" style={{ textAlign: "left", fontWeight: "bold" }}>
              {category?.snippet.title}
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Button color="secondary" variant='contained'>Subscribe</Button>
          </div>
          <Divider variant="fullWidth" />
          <Grid container spacing={2}>
            {data.items.slice(1).map((video) => (
              <React.Fragment key={video.id}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <a href={`https://youtube.com/watch?v=${data.items[0].id}`} target="_blank" rel="noreferrer">
                    <CardMedia component="img" image={video.snippet.thumbnails.medium.url} height={video.snippet.thumbnails.medium.height} />
                  </a>
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
        </>
      )}
    </Grid>
  );
};

export default ExploreIdPage;
