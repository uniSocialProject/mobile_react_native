import { useContext, useEffect, useState } from "react";
import Logo from "../../components/ui/Logo";
import {
  FlatList,
  SafeAreaView,
  View,
} from "react-native";
import { AuthContext } from "../../store/auth-context";

import {
  deleteFavorites,
  getDepartmentPosts,
  getFavorites,
  getPostComments,
  getUniversityPosts,
  postFavorites,
  postPostComments,
} from "../../service/feed/posts";
import BottomSheet from "../../components/ui/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Comments from "./comments/Comments";

import SharePostButton from "./components/share-post-button";
import ChatButton from "./components/chat-button";
import PostTypeButton from "./components/post-type-button";
import PostView from "./components/post-view";
import SharePostPage from "./share-post/share-post-page";

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

  const [isShareOpen,setIsShareOpen] = useState(false);

  const [isClick, setClick] = useState(false);

  async function toggleComments(postId) {
    if (!isOpen) {
      setPostId(postId);
      await getCommentsHandler(postId);
    }
    setIsOpen(!isOpen);
  }

  async function postCommentHandler(content) {
    await postPostComments(authCtx.token, postId, content);
    getCommentsHandler(postId);
  }

  async function getCommentsHandler(postId) {
    const comments = await getPostComments(authCtx.token, postId);
    setComments(comments.comments.reverse());
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
    {isShareOpen && <SharePostPage isShareOpen={isShareOpen} setIsShareOpen={setIsShareOpen}/>}
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
            <Logo height={75} width={150} />

            <View style={{ flexDirection: "row" }}>
              <SharePostButton setIsShareOpen={setIsShareOpen} />
              <ChatButton authCtx={authCtx} />
            </View>
          </View>

          <PostTypeButton setPostType={setPostType} postType={postType} />

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
                  <PostView
                    src={src}
                    item={item}
                    postFavoriteHandler={postFavoriteHandler}
                    favoritePosts={favoritePosts}
                    deleteFavoriteHandler={deleteFavoriteHandler}
                    isLoading={isLoading}
                    toggleComments={toggleComments}
                  />
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
