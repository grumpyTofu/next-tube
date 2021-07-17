import { Grid, Button, Card, CardContent, CardMedia } from "@material-ui/core";
import React from "react";
import { useFetchVideosByCategoryQuery } from "../app/services/videos";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const { data, isFetching } = useFetchVideosByCategoryQuery(undefined);

  console.log(data);
  return (
    <Grid container spacing={2} justify="center">
      {isFetching && <div>loading...</div>}
      {data &&
        data.items.map((video) => (
          <Grid item xs={9} sm={6} md={4} lg={3} xl={2} key={video.id}>
            <Card elevation={0}>
              <CardMedia
                component="img"
                image={video.snippet.thumbnails.high.url}
                alt={video.snippet.localized.title}
                title={video.snippet.localized.title}
              />
              <CardContent>{video.snippet.localized.title}</CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Dashboard;
