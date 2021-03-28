import createDataContext from "../createDataContext";
import { callImagesLoader } from "../../api/imageAPI";
import { callFindGrid, callChangeGrid } from "../../api/gridAPI";
import {
  GRID_IMAGES_SET,
  GRID_IMAGES_ERROR_SET,
  GRID_SET,
  GRID_ERROR_SET,
  GRID_ERRORS_CLEAR,
} from "./gridActions";

// reducer funtion to be used by the userReducer
// final state manupulation hapens here
const gridReducer = (state, action) => {
  switch (action.type) {
    case GRID_IMAGES_SET:
      return { ...state, images: action.images, imagesProcessing: false };
    case GRID_IMAGES_ERROR_SET:
      return { ...state, imagesError: action.error, imagesProcessing: false };
    case GRID_SET:
      return {
        ...state,
        grid: action.grid,
        items: action.items,
        gridProcessing: false,
      };
    case GRID_ERROR_SET:
      return { ...state, gridError: action.error, gridProcessing: false };
    case GRID_ERRORS_CLEAR:
      return {
        ...state,
        imagesError: "",
        imagesProcessing: true,
        gridError: "",
        gridProcessing: true,
      };
    default:
      return state;
  }
};

/**
 * Calling the image source API caller and receves
 * list of images
 *
 * @param {*} dispatch
 * @returns function to used in the images requesting functionality
 */
const loadImages = (dispatch) => () => {
  dispatch({ type: GRID_ERRORS_CLEAR });
  callImagesLoader(
    (response) => {
      dispatch({ type: GRID_IMAGES_SET, images: response.data.entries });
    },
    (error) => {
      dispatch({
        type: GRID_IMAGES_ERROR_SET,
        error: `Images loading failed: ${error}`,
      });
    }
  );
};

/**
 * Calling the caller for getting user's current image grid
 * @param {*} dispatch
 * @returns function to used in getting curren tuser's grid as for now
 */
const getGrid = (dispatch) => () => {
  dispatch({ type: GRID_ERRORS_CLEAR });
  callFindGrid(
    (response) => {
      dispatch({
        type: GRID_SET,
        grid: response.data.gridImage,
        items: response.data.items,
      });
    },
    (error) => {
      dispatch({
        type: GRID_ERROR_SET,
        error: `Grid loading failed: ${error}`,
      });
    }
  );
};

/**
 * Calling the caller for updating user's current image grid
 * @param {*} dispatch
 * @returns function to used in updating current tuser's grid wiht the new one
 */
const updateGrid = (dispatch) => (items) => {
  dispatch({ type: GRID_ERRORS_CLEAR });
  callChangeGrid(
    items,
    (response) => {
      dispatch({
        type: GRID_SET,
        grid: response.data.gridImage,
        items: response.data.items,
      });
    },
    (error) => {
      dispatch({
        type: GRID_ERROR_SET,
        error: `Grid updating failed: ${error}`,
      });
    }
  );
};

export const { Context, Provider } = createDataContext(
  gridReducer,
  { loadImages, getGrid, updateGrid },
  {
    images: [],
    imagesError: "",
    imagesProcessing: false,
    grid: [],
    items: [],
    gridError: "",
    gridProcessing: false,
  }
);
