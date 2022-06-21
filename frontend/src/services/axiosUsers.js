import axios from "axios";

//TODO: add reusable axios post and get request for customer details?
//get customer info at signUp page, show popup to continue if cookies exist
export function getUserData(phone_no, API_URL) {
  return axios.get(API_URL, phone_no).then((response) => response.data);
}

export function postUserData(data, API_URL) {
  return axios.post(API_URL,  data);
}

export default { getUserData, postUserData };
