import axios from "axios";

//TODO: add reusable axios post and get request for customer details?
//get customer info at signUp page, show popup to continue if cookies exist
// export async function getUserData(phone_no, API_URL) {
//   return await axios.get(API_URL, phone_no).then((response) => response.data);
// }

export async function getUserData(API_URL, phoneNumber) {
  return await axios.get(API_URL, phoneNumber);
}

export function postUserData(API_URL, data) {
  return axios.post(API_URL,  data);
}

export default { getUserData, postUserData };
