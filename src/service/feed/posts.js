import axios from "axios";
import foto from '../../assets/images/logo.png';
let baseURL = "https://uni-social-app.onrender.com";

export async function getUniversityPosts(token) {
  try {
    const response = await axios.get(baseURL + "/getPosts", {
      headers: { authorization: `Bearer ${await token}` },
    });

    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

export async function postUniversityPost(token, title, content) {

 
  try {
    console.log("girdi1");
    console.log(title)
    const response = await axios.post(
      baseURL + "/createPost",
      {'title':title,'content':content},
      {
        headers: {
          authorization: `Bearer ${await token}`,
          //'Content-Type': 'multipart/form-data'
          'Content-Type': 'application/json'

        }
      }
    );
    console.log("girdi2");
      return response.data;
  } catch (e) {
    console.log(e);

    throw e.response.data.message;
  }
}

export async function getDepartmentPosts(token) {
  try {
    const response = await axios.get(baseURL + "/getDepartmentPosts", {
      headers: { authorization: `Bearer ${await token}` },
    });

    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

export async function getFavorites(token) {
  try {
    const response = await axios.get(baseURL + "/user/getFavorites", {
      headers: { authorization: `Bearer ${await token}` },
    });

    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

export async function postFavorites(token, postId) {
  try {
    const response = await axios.post(
      baseURL + "/user/postFavorite/" + postId,
      {},
      {
        headers: { authorization: `Bearer ${await token}` },
      }
    );

    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

export async function deleteFavorites(token, postId) {
  try {
    const response = await axios.delete(
      baseURL + "/user/deleteFavorite/" + postId,
      {
        headers: { authorization: `Bearer ${await token}` },
      }
    );
    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

export async function getPostComments(token, postId) {
  try {
    const response = await axios.get(baseURL + "/comments/" + postId, {
      headers: { authorization: `Bearer ${await token}` },
    });
    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

export async function postPostComments(token, postId, content) {
  try {
    const response = await axios.post(
      baseURL + "/postComment/" + postId,
      { description: content },
      {
        headers: { authorization: `Bearer ${await token}` },
      }
    );
    return response.data;
  } catch (e) {
    throw e.response.data.message;
  }
}
