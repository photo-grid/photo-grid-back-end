import React, { useContext, useEffect, useState } from "react";
import { Context as GridContext } from "../../../context/grid/GridContext";
import { useLocation } from "react-router";
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  makeStyles,
  Button,
  Card,
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
    height: 450,
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

  // detecting isLight flag is true, if so switching to the lgiht weught
  // hard coded image source
  const isLight = location.search.startsWith("?light=true");

  // accessing the context data and grid related fucntions
  const {
    state: { images, items, gridProcessing },
    loadImages,
    updateGrid,
  } = useContext(GridContext);
  const [selectedImages, setSelectedImages] = useState([]);

  // if it is not to use the light weight images
  // calling the provided image source to get all the images
  useEffect(() => {
    if (!isLight) {
      loadImages();
    }
  }, [isLight]);

  // building the main image selection area
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

  // handles the click on an image
  // once clicked, checked agaisn the already selected images
  // and determines whether cliked image needs to be removed or
  // push to the list from the end
  const onImageClick = (image) => {
    // getting all the images not equal to selected image id from already
    // selected image lsit at this point
    const filteredSelectedItems = selectedImages.filter(
      (selectedImage) => selectedImage.imageId !== image.id
    );

    // check the sizes against the images array, before current selection
    if (selectedImages.length === filteredSelectedItems.length) {
      // sizes equals means this time user has clicked on a new image
      if (selectedImages.length < 9) {
        setSelectedImages([
          ...filteredSelectedItems,
          {
            imageId: image.id,
            imageURL: image.picture,
            position: selectedImages.length,
          },
        ]);
      } else {
        alert(
          "Already image selections are done. Click on an existing image to unselect."
        );
      }
    } else {
      // sizes not equals means this time user clicked to unselect an image
      setSelectedImages(
        filteredSelectedItems.map((image, index) => ({
          ...image,
          position: index,
        }))
      );
    }
  };

  // calling grid update API
  const onSavePress = () => {
    updateGrid(selectedImages);
  };

  // when items state gets changed (from saving new image combination or
  // from getting user's initial grid combination) marking the images on
  // image selection area to indicate user's previosu selections
  useEffect(() => {
    if (items.length && items.length > 0 && selectedImages.length === 0) {
      let newItems = [...items];
      // sorting the array by position id
      newItems.sort((left, right) => left.position - right.position);
      // setting the current image selection from previous image selection
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
            <Typography variant="body1" color="textSecondary" component="p">
              Select nine images in a desired order. Click{" "}
              <strong>Generate Grid Image</strong> to get merged image of
              selected images.
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              (Click on already selected images to change selection with order.
              Needs to made exact nine selections)
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
