import { v4 as uuidv4 } from "uuid";
import { userUUIDLocalStorageKey } from "../config";

// setting the user-uuid parameter in the browser local storage
const setUserUUID = (userUUID) => {
  localStorage.setItem(userUUIDLocalStorageKey, userUUID);
};

// getting the user-uuid form browser local storage, if not found,
// assigning a new one and returning
const getUserUUID = () => {
  let userUUID = localStorage.getItem(userUUIDLocalStorageKey);
  if (!userUUID) {
    userUUID = uuidv4();
    setUserUUID(userUUID);
  }
  return userUUID;
};

// fundtions to be exported
const userUUIDHandler = { setUserUUID, getUserUUID };

export default userUUIDHandler;
