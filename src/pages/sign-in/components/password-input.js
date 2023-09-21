import { StyleSheet, TextInput, View,TouchableOpacity } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";

function LoginPasswordInput({ isValid, data, setData, isPasswordSecure,setIsPasswordSecure }) {
  return (
    <View style={styles.input_container}>
      <TextInput
        style={isValid ? styles.input : styles.input_error}
        onChangeText={(value) => {
          setData({ ...data, password: value });
        }}
        value={data.password}
        placeholder="Şifre"
        secureTextEntry={isPasswordSecure}
      />
      <TouchableOpacity
        onPress={() => {
          isPasswordSecure
            ? setIsPasswordSecure(false)
            : setIsPasswordSecure(true);
        }}
      >
        <Octicons
          name={isPasswordSecure ? "eye-closed" : "eye"}
          size={20}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default LoginPasswordInput;

const styles = StyleSheet.create({
  input_container: {
    flexDirection: "row",
    paddingVertical: 0,
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
  icon: {
    marginHorizontal: 10,
  },
});
