import { StyleSheet, Text, TouchableOpacity } from "react-native";

function BackButton({ setStep, setIsValid }) {
  return (
    <TouchableOpacity
      style={styles.login_button}
      onPress={() => {
        setStep(1);
        setIsValid(true);
      }}
    >
      <Text style={styles.login_button_text}>Geri Dön</Text>
    </TouchableOpacity>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  login_button: {
    alignItems: "center",
  },
  login_button_text: {
    fontSize: 18,
    color: "#1286C8",
    fontWeight: "600",
  },
});
