import { NextPage } from "next";
import React from "react";

import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      minHeight: "calc(100vh - 65px - 48px)",
    },
  })
);

const ErrorPage: NextPage = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer} justify="center" alignItems="center">
      <Grid item xs={10}>
        <Typography variant="h3">Error | 404</Typography>
        <Divider style={{ marginTop: '.5rem'}}/>
        <Typography style={{ fontSize: '1.25rem'}}>Sorry, the content you are looking for does not exist</Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
