import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@material-ui/core";
import React from "react";

import { ClientSafeProvider, getProviders, signIn } from "next-auth/client";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { GetServerSideProps, NextPage } from "next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      maxWidth: "unset",
      backgroundColor: "black",
    },
    gridContainer: {
      height: "100%",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      minHeight: "50vh",
      backgroundColor: theme.palette.primary.light,
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    spacer: {
      flexGrow: 1,
    },
    cardContentItem: {
      padding: "2rem",
    },
    glass: {},
  })
);

interface LoginPageProps {
  providers: Record<string, ClientSafeProvider> | null;
}

const LoginPage: NextPage<LoginPageProps> = ({ providers }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container className={classes.gridContainer} justify="center" alignItems="center">
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Card className={clsx(classes.card, classes.glass)}>
            <div className={classes.spacer} />
            <CardContent className={clsx(classes.center, classes.cardContentItem)}>
              <Typography variant="h3">Next Tube</Typography>
            </CardContent>
            <div className={classes.spacer} />
            {providers &&
              Object.values(providers).map((provider) => (
                <CardActions className={clsx(classes.center, classes.cardContentItem)} key={provider.name}>
                  <Button variant="contained" color="secondary" onClick={() => signIn(provider.id, { redirect: false })} style={{ width: "50%" }}>
                    Login with {provider.name}
                  </Button>
                </CardActions>
              ))}
            <div className={classes.spacer} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default LoginPage;
