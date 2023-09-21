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
    fontWeight: "500",
    color: "#1286C8",
  },
});
