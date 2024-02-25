import axios from "axios";
const baseUrl = "/api/login/";

interface LoginCredentials {
  username: string;
  password: string;
}

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const exportedObject = { login };

export default exportedObject;
