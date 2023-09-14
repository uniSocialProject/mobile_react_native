import axios from "axios";

let baseURL = "https://uni-social-app.onrender.com";





export async function getPosts(token) {
 
    
    try {
      const response = await axios.get(baseURL + "/getPosts",{
        headers: {"authorization": `Bearer ${await token}`}
      })
       console.log(response.data)
      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
    
  }