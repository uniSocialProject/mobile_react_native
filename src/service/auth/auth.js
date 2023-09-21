import axios from "axios";
let baseURL = "https://uni-social-app.onrender.com/";

export async function register(data) {
  const { name, surname, university, department, email, password } = data;

  try {
    const response = await axios.post(
      baseURL + "auth/register",

      {
        name: name + surname,
        email: email,
        password: password,
        university: university,
        department: department,
      }
    );

    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

export async function login(email, password) {
  try {
    const response = await axios.post(baseURL + "auth/login", {
      email: email,
      password: password,
    });

    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}
