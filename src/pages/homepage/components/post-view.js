import { Image, Text, TouchableOpacity, View } from "react-native";
import MyLoader from "../../../components/ui/LoadingSkeleton";
import Ionicons from "react-native-vector-icons/Ionicons";
import FavoriteButton from "./favorite-button";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function PostView({
  isLoading,
  src,
  item,
  toggleComments,
  favoritePosts,
  deleteFavoriteHandler,
  postFavoriteHandler,
}) {
  return (
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image style={{ width: 35, height: 35 }} source={{ uri: src }} />
              <View style={{ justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 10,
                    fontFamily: `${process.env.EXPO_PUBLIC_PROJECT_FONT}Medium`,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 10,
                    fontFamily: `${process.env.EXPO_PUBLIC_PROJECT_FONT}Medium`,
                    color: "grey",
                  }}
                >
                  5 dakika önce
                </Text>
              </View>
            </View>
            <Ionicons name="ellipsis-vertical" size={20} color="black" />
          </View>

          <View style={{ paddingTop: 5, paddingBottom: 15 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: `${process.env.EXPO_PUBLIC_PROJECT_FONT}Medium`,
              }}
            >
              {item.content}
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FavoriteButton
                isLiked={favoritePosts.includes(item._id)}
                deleteFavoriteHandler={deleteFavoriteHandler}
                postFavoriteHandler={postFavoriteHandler}
                itemId={item._id}
              />

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
  );
}

export default PostView;
