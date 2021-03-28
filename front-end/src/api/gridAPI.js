import { gridAPIBaseURL, gridAPITimeout } from "../config";
import Axios from "axios";
import userUUIDHandler from "../util/userUUIDHandler";

// defing the Axios API instance parsing
// configurations. User UUID gets loaded from
// browser local storage and it gets assigned to
// header param 'user-uuid' which is a must for
// calling the grid api
const GridAPI = Axios.create({
  baseURL: gridAPIBaseURL,
  timeout: gridAPITimeout,
  headers: {
    "User-UUID": userUUIDHandler.getUserUUID(),
  },
});

/**
 * Finding the current grid of the user
 * @param {*} onSuccess
 * @param {*} onError
 */
export const callFindGrid = (onSuccess, onError) => {
  try {
    GridAPI.get("/grid")
      .then((response) => onSuccess(response))
      .catch((reason) => onError(reason));
  } catch (error) {
    onError(error);
  }
};

/**
 * Changin the current grid of the user
 * @param {*} items
 * @param {*} onSuccess
 * @param {*} onError
 */
export const callChangeGrid = (items, onSuccess, onError) => {
  try {
    GridAPI.put("/grid", { items })
      .then((response) => onSuccess(response))
      .catch((reason) => onError(reason));
  } catch (error) {
    onError(error);
  }
};
