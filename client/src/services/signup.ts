import axios from "axios";
const baseUrl = "/api/register/";

interface SignupCredentials {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

const signup = async (credentials: SignupCredentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const exportedObject = { signup };

export default exportedObject;
