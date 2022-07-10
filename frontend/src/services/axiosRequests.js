import axios from "axios";
import {
  USER_API,
  CHILD_API,
  CHILDREN_API,
  DELETE_ALL_API,
} from "../utilities/constants.js";

//get data using phoneNumber (for resumption or signup process)
//TODO: need route for getting data using phoneNumber?
export function getUserDataPhoneNumber(phoneNumber) {
  const API_URL = USER_API.concat("/" + phoneNumber);
  return axios.get(API_URL);
}

//get data using id
export function getUserDataId(userId) {
  const API_URL = USER_API.concat("/" + userId);
  return axios.get(API_URL);
}

//post new entry
export function postUserData(data) {
  return axios.post(USER_API, data);
}

//update existing entry using id
export function patchUserData(data, userId) {
  const API_URL = USER_API.concat("/" + userId);
  return axios.patch(API_URL, data);
}

//get child data using childId
export function getChildData(childId) {
  const API_URL = CHILD_API.concat("/" + childId);
  return axios.get(API_URL);
}

//get all children of a parent using user id
export function getAllChildrenData(parentId) {
  const API_URL = CHILDREN_API.concat("/" + parentId);
  return axios.get(API_URL);
}

//create new child entry using parent id
export function postChildData(data, parentId) {
  data["user_id"] = parentId;
  return axios.post(CHILD_API, data);
}

//update existing child entry using child id
export function patchChildData(data, childId) {
  const API_URL = CHILD_API.concat("/" + childId);
  // data = JSON.parse(data);
  return axios.patch(API_URL, data);
}

//delete child entry using parent id and child id
export function deleteChildData(childId) {
  const API_URL = CHILD_API.concat("/" + childId);
  return axios.delete(API_URL);
}

//delete all items in database, only in /admin page
export function deleteAllData() {
  return axios.delete(DELETE_ALL_API);
}

export default {
  getUserDataPhoneNumber,
  getUserDataId,
  postUserData,
  patchUserData,
  getChildData,
  getAllChildrenData,
  postChildData,
  patchChildData,
  deleteChildData,
  deleteAllData,
};
