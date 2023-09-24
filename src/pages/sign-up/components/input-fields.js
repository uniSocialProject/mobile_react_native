import { StyleSheet, TextInput, View } from "react-native";

function RegisterInputs({ isValid, value, onChangeText, placeholder }) {
  return (
    <View style={styles.input_container}>
      <TextInput
        style={isValid ? styles.input : styles.input_error}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
}

export default RegisterInputs;

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
});
