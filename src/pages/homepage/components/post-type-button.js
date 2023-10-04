import { Text, TouchableOpacity, View } from "react-native";

function PostTypeButton({setPostType,postType,}) {
  return (
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
            fontFamily: `${process.env.EXPO_PUBLIC_PROJECT_FONT}Medium`,

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
            fontFamily: `${process.env.EXPO_PUBLIC_PROJECT_FONT}Medium`,
            fontSize: 12,
            color: postType ? "white" : "black",
          }}
        >
          BÖLÜM GÖNDERİLERİ
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default PostTypeButton;
