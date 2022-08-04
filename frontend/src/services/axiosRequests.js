import axios from "axios";
import {
  USER_API,
  CHILD_API,
  CHILDREN_API,
  DELETE_ALL_API,
  OCR_API,
} from "../utilities/constants.js";

//get data using phoneNumber (for resumption or signup process)
// /api/v1/users?phone_number=${phoneNumber}
export function getUserDataPhoneNumber(phoneNumber) {
  return axios.get(USER_API, { params: { phone_number: phoneNumber } });
}

//get data using id
// /api/v1/users?id=${id}
export function getUserDataId(userId) {
  return axios.get(USER_API, { params: { id: userId } });
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
  return axios.get(CHILDREN_API, { params: { id: parentId } });
}

//create new child entry using parent id
export function postChildData(data, parentId) {
  data["user_id"] = parentId;
  return axios.post(CHILD_API, data);
}

//update existing child entry using child id
export function patchChildData(data, childId) {
  const API_URL = CHILD_API.concat("/" + childId);
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

//get passport data from backend
// /api/v1/ocr/?image_name=${imageName}
export function getPassportData(imageName) {
  return axios.get(OCR_API, { params: { image_name: imageName } });
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
  getPassportData,
};
