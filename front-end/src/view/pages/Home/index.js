import React from "react";
import ImageSelector from "../../components/ImageSelector";
import ImageGrid from "../../components/ImageGrid";
import { Container, CssBaseline, Grid } from "@material-ui/core";

const Home = () => {
  return (
    <>
     <CssBaseline />
      <Container fixed>
        <Grid container height="100%" justifyItems="center" alignItems="center">
          <Grid item xs={6}>
            <ImageSelector />
          </Grid>
          <Grid item xs={6}>
            <ImageGrid />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
