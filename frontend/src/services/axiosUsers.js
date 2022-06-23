import axios from "axios";

export async function getUserData(API_URL, phoneNumber) {
  return await axios.get(API_URL, phoneNumber);
}

export function postUserData(API_URL, data) {
  return axios.post(API_URL, data);
}

export function patchUserData(API_URL, data, phoneNumber) {
  API_URL = API_URL.concat("/" + phoneNumber);
  return axios.patch(API_URL, data);
}

export default { getUserData, postUserData, patchUserData };
