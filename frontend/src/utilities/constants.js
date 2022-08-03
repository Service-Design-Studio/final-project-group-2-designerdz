const URL = "http://localhost:3000";
// "https://dbs-service-qz6esvmepq-as.a.run.app"

export const USER_API = URL.concat("/api/v1/users");

export const CHILD_API = URL.concat("/children");

export const CHILDREN_API = URL.concat("/parent");

export const DELETE_ALL_API = URL.concat("/api/v1/profile/delete");

export const OCR_API = URL.concat("/api/v1/ocr");

export default { USER_API, CHILD_API, CHILDREN_API, DELETE_ALL_API, OCR_API };
