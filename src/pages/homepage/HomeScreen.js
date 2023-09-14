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
import { getPosts } from "../../util/posts";
import MyLoader from "../../components/LoadingSkeleton";
export default function HomePage({ navigation }) {
  const src =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const authCtx = useContext(AuthContext);

  const [posts, setPosts] = useState([1, 2, 3, 4, 5]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getResources() {
      setIsLoading(true);
      try {
        const data = await getPosts(authCtx.token);

        setPosts(data.posts);
        setIsLoading(false);
      } catch (e) {
        console.log("hata");
        setIsLoading(false);
      }
    }
    getResources();
  }, []);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <View
          style={{
            height: 75,
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

        <FlatList
          keyExtractor={(item) => item._id}
          data={posts}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 95 }}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={{
                    margin: 5,
                    backgroundColor: "white",
                    elevation: 20,
                    borderRadius: 15,
                    padding: 15,
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
                        <MaterialIcons
                          name="favorite-outline"
                          size={30}
                          color="black"
                        />
                        <MaterialIcons name="comment" size={30} color="black" />
                      </View>
                    </View>
                  )}
                </View>
              </>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
}
