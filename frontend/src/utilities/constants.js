<<<<<<< HEAD
export const USER_URL =
  "http://127.0.0.1:3000/api/v1/users/";
  //"https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/users"; //customer data api (for now)

export const PATCH_USER_URL =
  "http://127.0.0.1:3000/api/v1/profile/";
  //"https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/profile/"; //update API to update user details, concat phone number at the end
=======
export const GET_USER_URL =
  //   "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/profile/"; //customer data api (for now)
  "http://localhost:3000/api/v1/profile";

export const POST_USER_URL =
  //   "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/users"; //customer data api (for now)
  "http://localhost:3000/api/v1/users";

export const PATCH_USER_URL =
  // "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/profile/"; //update API to update user details, concat phone number at the end
  "http://localhost:3000/api/v1/profile";
>>>>>>> 91d04d822e5af462926c90bd4e7e3c4b8979d0cb

export default { GET_USER_URL, POST_USER_URL, PATCH_USER_URL };
