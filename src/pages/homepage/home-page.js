import { useContext, useEffect, useRef, useState } from "react";
import Heart from "react-animated-heart";

import {
  Button,
  FlatList,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  deleteFavorites,
  getDepartmentPosts,
  getFavorites,
  getPostComments,
  getUniversityPosts,
  postFavorites,
  postPostComments,
} from "../../service/feed/posts";
import MyLoader from "../../components/ui/LoadingSkeleton";
import LottieView from "lottie-react-native";
import BottomSheet from "../../components/ui/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Comments from "./comments/Comments";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomePage({ navigation }) {
  const src =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const authCtx = useContext(AuthContext);

  const [uniPosts, setUniPosts] = useState([1, 2, 3, 4, 5]);
  const [deptPosts, setDeptPosts] = useState([1, 2, 3, 4, 5]);

  const [postType, setPostType] = useState(false);

  const [comments, setComments] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [postId, setPostId] = useState("");

  const [isClick, setClick] = useState(false);

  async function toggleComments(postId) {
    if (!isOpen) {
      setPostId(postId);
      await getCommentsHandler(postId);
    }
    setIsOpen(!isOpen);

    console.log(isOpen);
  }

  async function postCommentHandler(content) {
    await postPostComments(authCtx.token, postId, content);
    getCommentsHandler(postId);
  }

  async function getCommentsHandler(postId) {
    const comments = await getPostComments(authCtx.token, postId);
    setComments(comments.comments.reverse());

    console.log(comments.comments);
  }

  async function deleteFavoriteHandler(postId) {
    await deleteFavorites(authCtx.token, postId);
    const favorites = await getFavorites(authCtx.token);
    setFavoritePosts(favorites.favorites);
  }

  async function postFavoriteHandler(postId) {
    console.log(authCtx.token);
    await postFavorites(authCtx.token, postId);
    const favorites = await getFavorites(authCtx.token);
    setFavoritePosts(favorites.favorites);
  }

  async function getResources() {
    setIsLoading(true);
    try {
      const uniPosts = await getUniversityPosts(authCtx.token);
      const deptPosts = await getDepartmentPosts(authCtx.token);
      const favorites = await getFavorites(authCtx.token);
      setFavoritePosts(favorites.favorites);
      setUniPosts(uniPosts.posts.reverse());
      setDeptPosts(deptPosts.Posts.reverse());
      setIsLoading(false);
    } catch (e) {
      console.log("hata");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getResources();
  }, [setIsLoading]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
        <SafeAreaView>
          <View
            style={{
              height: 100,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 15,
              paddingHorizontal: 10,
            }}
          >
            <Image
              style={{ height: 75, width: 150 }}
              source={require("../../assets/images/logo.png")}
            />

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  //getPosts(authCtx.token);
                  navigation.navigate("SharePostPage");
                }}
              >
                <Entypo name="plus" size={30} color="#1286C8" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  //getPosts(authCtx.token);
                  authCtx.logout();
                }}
              >
                <Entypo
                  name="message"
                  style={{ paddingHorizontal: 10 }}
                  size={30}
                  color="#1286C8"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingBottom: 15,

              flexDirection: "row",
              justifyContent: "space-around",
              alignContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#1286C8",
            }}
          >
            <TouchableOpacity
              style={
                postType
                  ? {
                      borderRadius: 10,
                      padding: 10,
             
                      borderColor: "#1286C8",
                      borderBottomWidth: 2,
                    }
                  : {
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#1286C8",
                      
                    }
              }
              onPress={() => {
                setPostType(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratAlternates-SemiBold",

                  fontSize: 12,
                  color: postType ? "black" : "white",
                }}
              >
                ÜNİVERSİTE GÖNDERİLERİ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                postType
                  ? {
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#1286C8",
                    }
                  : {
                      borderRadius: 10,
                      padding: 10,
                      borderColor: "#1286C8",
                      borderBottomWidth: 2,
                    }
              }
              onPress={() => {
                setPostType(true);
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratAlternates-SemiBold",
                  fontSize: 12,
                  color: postType ? "white" : "black",
                }}
              >
                BÖLÜM GÖNDERİLERİ
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item) => item._id}
            data={postType ? deptPosts : uniPosts}
            scrollEnabled={true}
            refreshing={isLoading}
            onRefresh={() => {
              getResources();
            }}
            contentContainerStyle={{ paddingBottom: 175 }}
            renderItem={({ item }) => {
              return (
                <>
                  <View
                    style={{
                      margin: 5,
                      backgroundColor: "white",
                      borderRadius: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: "#1286C8",
                      padding: 20,
                    }}
                  >
                    {isLoading ? (
                      <View style={{ margin: 5, padding: 15 }}>
                        <MyLoader />
                      </View>
                    ) : (
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                            paddingVertical: 15,
                          }}
                        >
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                              style={{ width: 35, height: 35 }}
                              source={{ uri: src }}
                            />
                            <View style={{justifyContent: "space-between"}}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  paddingLeft: 10,
                                  fontFamily: "MontserratAlternates-SemiBold"
                                }}
                              >
                                {item.title}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 16,
                                  paddingLeft: 10,
                                  fontFamily: "MontserratAlternates-MediumItalic",
                                  color: "grey",
                                }}
                              >
                                5 dakika önce
                              </Text>
                            </View>
                          </View>
                          <Ionicons
                            name="ellipsis-vertical"
                            size={20}
                            color="black"
                          />
                        </View>

                        <View style={{ paddingTop: 5,paddingBottom: 15 }}>
                          <Text style={{ fontSize: 18,  fontFamily: "MontserratAlternates-Medium" }}>{item.content}</Text>
                        </View>

                        <View
                          style={{ paddingVertical: 10, flexDirection: "row", justifyContent: "space-between" }}
                        >
                          <View style={{flexDirection: "row",alignItems: "center"}}>
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              
                            }}
                            onPress={() => {
                              favoritePosts.includes(item._id)
                                ? deleteFavoriteHandler(item._id)
                                : postFavoriteHandler(item._id);
                            }}
                          >
                            <MaterialIcons
                              name={
                                favoritePosts.includes(item._id)
                                  ? "favorite"
                                  : "favorite-outline"
                              }
                              color={
                                favoritePosts.includes(item._id)
                                  ? "red"
                                  : "black"
                              }
                              size={26}
                            />
                            
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 5,
                              alignItems: "center",
                            }}
                            onPress={() => {
                              toggleComments(item._id);
                            }}
                          >
                            <Entypo name="message" size={26} color="black" />
                            
                          </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 10,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() => {
                              toggleComments(item._id);
                            }}
                          >
                            <FontAwesome name="share" size={20} color="black" />
                            
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </>
              );
            }}
          />

          {isOpen && (
            <BottomSheet
              children={
                <Comments
                  comments={comments}
                  postCommentHandler={postCommentHandler}
                  toggle={toggleComments}
                />
              }
              toggle={toggleComments}
            />
          )}
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}
