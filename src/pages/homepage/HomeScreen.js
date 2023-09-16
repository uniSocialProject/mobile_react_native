import { useContext, useEffect, useRef, useState } from "react";
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  deleteFavorites,
  getDepartmentPosts,
  getFavorites,
  getPostComments,
  getUniversityPosts,
  postFavorites,
} from "../../util/posts";
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



  async function toggleComments(postId) {
    if (!isOpen) {
      await getCommentsHandler(postId);
    }
    setIsOpen(!isOpen);

    console.log(isOpen);
  }

  async function getCommentsHandler(postId) {
    const comments = await getPostComments(authCtx.token, postId);
    setComments(comments.comments);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: "#EFECF4" }}>
          <View
            style={{
              height: 100,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              elevation: 10,
              paddingTop: 15,
              paddingHorizontal: 10,
            }}
          >
            <Image
              style={{ height: 75, width: 150 }}
              source={require("../../assets/images/logo.png")}
            />

            <TouchableOpacity
              onPress={() => {
                //getPosts(authCtx.token);
                authCtx.logout();
              }}
            >
              <Entypo name="message" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-around",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={
                postType
                  ? {
                      borderRadius: 10,
                      padding: 10,
                      borderColor: "#1286C8",
                      borderWidth: 2,
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
                  fontWeight: "600",
                  fontSize: 14,
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
                      borderWidth: 2,
                    }
              }
              onPress={() => {
                setPostType(true);
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 14,
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
                      elevation: 20,
                      borderRadius: 15,
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
                          <View style={{flexDirection: "row"}}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: src }}
                          />
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                paddingLeft: 10,
                                fontWeight: "600",
                              }}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                paddingLeft: 10,
                                fontWeight: "400",
                                color: "grey",
                              }}
                            >
                              @eraybuyukkanat
                            </Text>
                            </View>
                          </View>
                          <Ionicons
                            name="ellipsis-vertical"
                            size={24}
                            color="black"
                          />
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                          <Text style={{ fontSize: 19 }}>{item.content}</Text>
                        </View>

                        <View
                          style={{ paddingVertical: 10, flexDirection: "row" }}
                        >
                          {favoritePosts.includes(item._id) && (
                            <TouchableOpacity
                              onPress={() => {
                                deleteFavoriteHandler(item._id);
                              }}
                            >
                              <MaterialIcons
                                name="favorite"
                                size={34}
                                color="red"
                              />
                            </TouchableOpacity>
                          )}
                          {!favoritePosts.includes(item._id) && (
                            <TouchableOpacity
                              onPress={() => {
                                postFavoriteHandler(item._id);
                              }}
                            >
                              <MaterialIcons
                                name="favorite-outline"
                                size={34}
                                color="black"
                              />
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity
                          style={{paddingHorizontal: 10}}
                            onPress={() => {
                              toggleComments(item._id);
                            }}
                          >
                            <MaterialIcons
                              name="comment"
                              size={34}
                              color="black"
                            />
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
                <Comments comments={comments} toggle={toggleComments} />
              }
              toggle={toggleComments}
            />
          )}
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}
