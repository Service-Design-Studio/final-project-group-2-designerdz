const URL =
  "http://localhost:3000";
  // "https://dbs-service-qz6esvmepq-as.a.run.app";

export const USER_API = URL.concat("/api/v1/users");
// // "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/users"
// "http://localhost:3000/api/v1/users";

export const CHILD_API = URL.concat("/children");
// // "https://dbs-service-qz6esvmepq-as.a.run.app/children"
// ("http://localhost:3000/children");

export const CHILDREN_API = URL.concat("/parent");
// // "https://dbs-service-qz6esvmepq-as.a.run.app/parent"
// "http://localhost:3000/parent";

export const DELETE_ALL_API = URL.concat("/api/v1/profile/delete");
// // "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/profile/delete"
// "http://localhost:3000/api/v1/profile/delete";

export default { USER_API, CHILD_API, CHILDREN_API, DELETE_ALL_API };
