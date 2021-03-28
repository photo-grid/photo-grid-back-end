import React, { useContext, useEffect, useState } from "react";
import { Context as GridContext } from "../../../context/grid/GridContext";
import { useLocation } from "react-router";
import {
  CssBaseline,
  Container,
  Box,
  ImageList,
  ImageListItem,
  Typography,
  makeStyles,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Image from "material-ui-image";
import SaveIcon from "@material-ui/icons/Save";
import { grey } from "@material-ui/core/colors";
import { lightWeightImages } from "../../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  imageList: {
    widht: 400,
    height: 500,
  },
  image: {
    backgroundImage: "url('/images/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    display: "inline-block",
    verticalAlign: "middle",
  },
  numberLabel: {
    position: "absolute",
    width: "25px",
    height: "25px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ImageSelector = () => {
  const classes = useStyles();
  const location = useLocation();
  const isLight = location.search.startsWith("?light=true");
  const {
    state: {
      images,
      imagesError,
      imagesProcessing,
      grid,
      items,
      gridError,
      gridProcessing,
    },
    loadImages,
    updateGrid,
  } = useContext(GridContext);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (!isLight) {
      loadImages();
    }
  }, [isLight]);

  const buildImageGridView = () =>
    (isLight ? lightWeightImages : images).map((image, index) => {
      const selectedImage = selectedImages.find(
        (selectedImage) => selectedImage.imageId === image.id
      );
      return (
        <ImageListItem key={image.id}>
          <Image
            onClick={() => onImageClick(image)}
            src={image.picture}
            aspectRatio={1 / 1}
          />
          {selectedImage && (
            <Box
              display="flex"
              justifyContent="center"
              bgcolor="rgba(0, 0, 0, 0.55)"
              p={1}
              className={classes.numberLabel}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h6" color={grey[400]}>
                  {selectedImage.position + 1}
                </Typography>
              </Box>
            </Box>
          )}
        </ImageListItem>
      );
    });

  const onImageClick = (image) => {
    const filteredSelectedItems = selectedImages.filter(
      (selectedImage) => selectedImage.imageId !== image.id
    );
    if (selectedImages.length === filteredSelectedItems.length) {
      if (selectedImages.length < 9) {
        setSelectedImages([
          ...filteredSelectedItems,
          {
            imageId: image.id,
            imageURL: image.picture,
            position: selectedImages.length,
          },
        ]);
      }
    } else {
      setSelectedImages(
        filteredSelectedItems.map((image, index) => ({
          ...image,
          position: index,
        }))
      );
    }
  };

  const onSavePress = () => {
    updateGrid(selectedImages);
  };

  useEffect(() => {
    if (items.length && items.length > 0 && selectedImages.length === 0) {
      let newItems = [...items];
      newItems.sort((left, right) => left.position - right.position);
      setSelectedImages(newItems);
    }
  }, [items]);

  return (
    <>
      <Card className={classes.root} elevation={10}>
        <Box p={3}>
          <ImageList className={classes.imageList} cols={3} rowHeight={200}>
            {buildImageGridView()}
          </ImageList>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Select Images
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Select nine images in a desired order. Click{" "}
              <strong>Generate Grid Image</strong> to get merged image of
              selected images.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              disabled={selectedImages.length !== 9 || gridProcessing}
              onClick={onSavePress}
            >
              Generate Grid Image
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default ImageSelector;
