import { StyleSheet, Text, TouchableOpacity } from "react-native";


function LoginButton({navigation}){
    return  <TouchableOpacity
    style={styles.login_button}
    onPress={() => navigation.navigate("LoginPage")}
  >
    <Text style={styles.login_button_text}>
      Hesabınız varsa giriş yapın!
    </Text>
  </TouchableOpacity>
}

export default LoginButton;

const styles = StyleSheet.create({
    input_container: {
      flexDirection: "row",
      paddingVertical: 0,
      width: "auto",
      alignItems: "center",
      marginVertical: 10,
    },
  
    input: {
      height: 45,
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      flex: 1,
    },
    input_error: {
      height: 45,
      borderRadius: 10,
      borderWidth: 2,
      padding: 10,
      flex: 1,
      borderColor: "red",
    },
  
    register_button: {
      alignItems: "center",
      margin: 20,
      padding: 20,
      backgroundColor: "#1286C8",
      borderRadius: 10,
    },
    register_button_text: {
      fontWeight: "600",
      fontSize: 18,
      color: "white",
    },
    login_button: {
      alignItems: "center",
    },
    login_button_text: {
      fontSize: 18,
      color: "#1286C8",
      fontWeight: "600",
    },
    step_info: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 22,
    },
  });
  