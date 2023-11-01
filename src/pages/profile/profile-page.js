import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const src =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
export default function ProfilePage() {
  return (
    <View style={styles.root_container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: `${process.env.EXPO_PUBLIC_PROJECT_FONT}Regular`,
            color: "#1286C8",
          }}
        >
          PROFILE
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={30}
            color="#1286C8"
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: "center", padding: 20}} >
        <Image style={{ width: 100, height: 100 }} source={{ uri: src }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root_container: {
    padding: 36,
  },
});
