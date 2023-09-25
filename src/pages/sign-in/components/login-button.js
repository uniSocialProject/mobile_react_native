import { StyleSheet, Text, TouchableOpacity } from "react-native";

function LoginButton({ data, setIsValid, setData, loginHandler }) {
  return (
    <TouchableOpacity
      style={styles.login_button}
      onPress={() => {
        if (data.email != "" && data.password != "") {
          console.log(data.email, data.password);
          loginHandler(data.email, data.password);
          setData({ email: "", password: "" });
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }}
    >
      <Text style={styles.login_button_text}>Giriş Yap</Text>
    </TouchableOpacity>
  );
}

export default LoginButton;

const styles = StyleSheet.create({
  login_button: {
    alignItems: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "#1286C8",
    borderRadius: 10,
  },
  login_button_text: {
    fontFamily: 'MontserratAlternates-Medium',
    fontSize: 18,
    color: "white",
  },
});
