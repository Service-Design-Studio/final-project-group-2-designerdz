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
  // // remove Passport key from dictionary
  // delete data.Passport;
  // data["dob"] = data["dob"].toString()
  // data["passport_expiry"] = data["passport_expiry"].toString()
  // data["id"] = 999
  // data["display_name"] = "test"
  // data["title"] = "test"
  // data["email"] = "jolow@email.com"
  // data["phone_number"] = 1234567890

  console.log("POSTING DATA");
  console.log(API_URL);
  console.log(data);
  return axios.post(API_URL, data);
}

export function patchUserData(API_URL, data, phoneNumber) {
  API_URL = API_URL.concat(phoneNumber);
  console.log("PATCHING DATA the URL");
  console.log(API_URL);
  return axios.patch(API_URL, data);
}

export default { getUserData, postUserData, patchUserData };
