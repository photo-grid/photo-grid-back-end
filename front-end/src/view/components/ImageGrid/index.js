import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Image from "material-ui-image";

import React, { useContext, useEffect } from "react";
import { Context as GridContext } from "../../../context/grid/GridContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    display: "inline-block",
    verticalAlign: "middle",
    width: 450,
    height: 450,
  },
}));

const ImageGrid = () => {
  const classes = useStyles();

  const {
    state: { grid, gridProcessing, gridError },
    getGrid,
  } = useContext(GridContext);

  useEffect(() => {
    getGrid();
  }, []);

  return (
    <>
      <Card className={classes.root} elevation={15}>
        <Box p={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            m={1}
            p={1}
          >
            <Box>
              <img
                alt="Grid"
                className={classes.image}
                src={grid === "" ? 'url("/images/background.png")' : grid}
              />
            </Box>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Grid Image
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {gridProcessing
                ? "Fetching the grid image. This takes time, please be patient! :-)"
                : grid === ""
                ? "You have gon no grid image. Please select nine images from left side and hit <strong>Generate Grid Image</strong> to enerate a one"
                : `Grid image successfully loaded.`}
            </Typography>
            {gridError !== "" && (
              <Typography variant="body2" color="red" component="p">
                Someting went wrong!
              </Typography>
            )}
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default ImageGrid;
