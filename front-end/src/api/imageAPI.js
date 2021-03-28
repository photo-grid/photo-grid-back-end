import { imageSourceURL } from "../config";
import Axios from "axios";

/**
 * Calling the image source endpoint. onSuccess and onError
 * will get called in the situations of normal Axios API calls
 *
 * @param {*} onSuccess
 * @param {*} onError
 */
export const callImagesLoader = async (onSuccess, onError) => {
  try {
    const response = await Axios.get(imageSourceURL);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};
