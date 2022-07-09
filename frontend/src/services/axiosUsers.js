import axios from "axios";
import {
  USER_API,
  CHILD_API,
  CHILDREN_API,
  DELETE_ALL_API,
} from "../utilities/constants.js";

//get data using phoneNumber (for resumption or signup process)
export async function getUserDataPhoneNumber(phoneNumber) {
  const API_URL = USER_API.concat("/" + phoneNumber);
  return await axios.get(API_URL);
}

//get data using id
export async function getUserDataId(userId) {
  const API_URL = USER_API.concat("/" + userId);
  return await axios.get(API_URL);
}

//post new entry
export function postUserData(data) {
  return axios.post(USER_API, data);
}

//update existing entry using id
export async function patchUserData(data, userId) {
  const API_URL = USER_API.concat("/" + userId);
  return await axios.patch(API_URL, data);
}

//get child data using userId and childId
export async function getChildData(childId) {
  const API_URL = CHILD_API.concat("/" + childId);
  return await axios.get(API_URL);
}

//get all children of a parent using user id
export async function getAllChildrenData(userId) {
  const API_URL = CHILDREN_API.concat("/" + userId);
  return await axios.get(API_URL);
}

//create new child entry
export async function postChildData(data) {
  return await axios.post(CHILD_API, data);
}

//update existing child entry using child id
export async function patchChildData(data, childId) {
  const API_URL = CHILD_API.concat("/" + childId);
  return await axios.patch(API_URL, data);
}

//delete child entry using parent id and child id
export async function deleteChildData(childId) {
  const API_URL = CHILD_API.concat("/" + childId);
  return await axios.delete(API_URL);
}

//delete all items in database, only in /admin page
export async function deleteAllData() {
  return await axios.delete(DELETE_ALL_API);
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
