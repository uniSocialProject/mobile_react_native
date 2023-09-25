import { StyleSheet, Text, TouchableOpacity } from "react-native";

function RegisterButton({navigation}) {
  return (
    <TouchableOpacity
      style={styles.register_button}
      onPress={() => navigation.navigate("RegisterPage")}
    >
      <Text style={styles.register_button_text}>
        Hesabınız yoksa kayıt olun!
      </Text>
    </TouchableOpacity>
  );
}

export default RegisterButton;

const styles = StyleSheet.create({
    register_button: {
      alignItems: "center",
    },
    register_button_text: {
      fontSize: 18,
      color: "#1286C8",
      fontFamily: 'MontserratAlternates-Medium',

    },
  });