import { useContext, useEffect, useState } from "react";
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
  getFavorites,
  getPostComments,
  getPosts,
  postFavorites,
} from "../../util/posts";
import MyLoader from "../../components/LoadingSkeleton";
import LottieView from "lottie-react-native";
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Comments from "./comments/Comments";
export default function HomePage({ navigation }) {
  const src =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const authCtx = useContext(AuthContext);

  const [posts, setPosts] = useState([1, 2, 3, 4, 5]);
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
      const data = await getPosts(authCtx.token);
      const favorites = await getFavorites(authCtx.token);
      setFavoritePosts(favorites.favorites);
      setPosts(data.posts);
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
        <SafeAreaView style={{ backgroundColor: "white" }}>
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
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: "#1286C8",
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 14, color: "white" }}>
                ÜNİVERSİTE GÖNDERİLERİ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                padding: 10,
                borderColor: "#1286C8",
                borderWidth: 2,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 14 }}>
                BÖLÜM GÖNDERİLERİ
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item) => item._id}
            data={posts}
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
                            alignItems: "center",
                            backgroundColor: "white",
                            paddingVertical: 15,
                          }}
                        >
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: src }}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              paddingLeft: 10,
                              fontWeight: "600",
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                          <Text style={{ fontSize: 17 }}>{item.content}</Text>
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
                                size={32}
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
                                size={32}
                                color="black"
                              />
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity
                            onPress={() => {
                              toggleComments(item._id);
                            }}
                          >
                            <MaterialIcons
                              name="comment"
                              size={32}
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
