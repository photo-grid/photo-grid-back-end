import React from "react";
import ImageSelector from "../../components/ImageSelector";
import ImageGrid from "../../components/ImageGrid";
import { Box, Container } from "@material-ui/core";

// functional component for main page of the app
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
