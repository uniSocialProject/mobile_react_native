import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ForgotPasswordText() {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.forgot_passwd}>Şifrenizi mi unuttunuz?</Text>
      </TouchableOpacity>
    </View>
  );
}
export default ForgotPasswordText;

const styles = StyleSheet.create({
  forgot_passwd: {
    fontSize: 18,
    fontFamily: `${process.env.EXPO_PUBLIC_PROJECT_FONT}Medium`,

    color: "#1286C8",
  },
});
