import axios from "axios";

export const LOGIN_URL = `http://localhost:3002/api/v1/users/login`;
export const REGISTER_URL = `http://localhost:3002/api/v1/users/registration`;

export function login(userId, password) {
  return axios.post(LOGIN_URL, { userId, password });
}

export function register(userId, email, password, userName) {
  return axios.post(REGISTER_URL, { userId, email, password, userName });
}
