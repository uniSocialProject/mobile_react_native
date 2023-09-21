import axios from "axios";

let baseURL = "https://uni-social-app.onrender.com";





export async function getUniversityPosts(token) {
 
    
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

  export async function getDepartmentPosts(token) {
 
    
    try {
      const response = await axios.get(baseURL + "/getDepartmentPosts",{
        headers: {"authorization": `Bearer ${await token}`}
      })
       console.log(response.data)
      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
    
  }

  export async function getFavorites(token) {
 
    
    try {
      const response = await axios.get(baseURL + "/user/getFavorites",{
        headers: {"authorization": `Bearer ${await token}`}
      })
       console.log(response.data)
      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
    
  }

  export async function postFavorites(token,postId) {
 
    console.log("girdi 2")

    try {
      
      const response = await axios.post(baseURL + "/user/postFavorite/"+postId,{},{
        headers: {"authorization": `Bearer ${await token}`}
      })
      console.log("girdi 3")

       console.log(response.data)
      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
    
  }

  export async function deleteFavorites(token,postId) {
 
    
    try {
      const response = await axios.delete(baseURL + "/user/deleteFavorite/"+postId,{
        headers: {"authorization": `Bearer ${await token}`}
      })
       console.log(response.data)
      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
    
  }


  export async function getPostComments(token,postId) {
 
    
    try {
      const response = await axios.get(baseURL + "/comments/"+postId,{
        headers: {"authorization": `Bearer ${await token}`}
      })
      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
    
  }

  
  export async function postPostComments(token,postId,content) {
 
    
    try {
      const response = await axios.post(baseURL + "/postComment/"+postId,{'description':content},{
        headers: {"authorization": `Bearer ${await token}`}
      })
      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
    
  }