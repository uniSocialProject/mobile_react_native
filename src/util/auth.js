import axios from "axios";
let baseURL = "https://uni-social-app.onrender.com/";
export async function register(data) {
  const { name, surname, university, department, email, password } = data;
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

  console.log(response.data);
    const token = response.data.token;
    return token;
}

export async function login(email,password){
  const response = await axios.post(
    baseURL + "auth/login",
    {
      email: email,
      password: password,
    },
    
  );

  console.log(response.data)
  const token = response.data.token;
  return token;
}