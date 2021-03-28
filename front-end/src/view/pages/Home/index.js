import React from "react";
import ImageSelector from "../../components/ImageSelector";
import ImageGrid from "../../components/ImageGrid";
import { Box, Container, CssBaseline, Grid } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Container bgcolor="background.paper">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          m={1}
          p={1}
        >
          <Box pr={5}>
            <ImageSelector />
          </Box>
          <Box pl={5}>
            <ImageGrid />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
