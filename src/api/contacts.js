import axios from "axios";

const API = axios.create({
  baseURL:
    "https://contact-list-backend-production.up.railway.app/api/contacts/",
  // baseURL: 'http://localhost:5000/',
});

// for attaching headers
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    let token = JSON.parse(localStorage.getItem("profile")).stsTokenManager
      .accessToken;

    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export const getAllContacts = () => API.get("/all");
export const addContactToBackend = (contactData) =>
  API.post("/create", contactData);

export const deleteContactBackend = (id) => API.delete(`/delete/${id}`);
export const updateContactBackend = (id, contactData) =>
  API.patch(`/update/${id}`, contactData);
