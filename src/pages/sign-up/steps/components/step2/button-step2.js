import { StyleSheet, Text, TouchableOpacity } from "react-native";

function ButtonStep2({ setStep, data, setIsValid }) {
  return (
    <TouchableOpacity
      style={styles.register_button}
      onPress={() => {
        if (
          data.university != "" &&
          data.department != "" &&
          data.department != undefined &&
          data.university != undefined
        ) {
          setStep(3);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }}
    >
      <Text style={styles.register_button_text}>Devam Et</Text>
    </TouchableOpacity>
  );
}

export default ButtonStep2;

const styles = StyleSheet.create({
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
});
