import { StyleSheet, TextInput, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function LoginEmailInput({isValid, data,setData}) {
  return (
    <View style={styles.input_container}>
      <TextInput
        style={isValid ? styles.input : styles.input_error}
        value={data.email}
        onChangeText={(value) => {
          setData({ ...data, email: value });
        }}
        placeholder="Email"
      />
      <MaterialIcons
        name="alternate-email"
        size={20}
        color="black"
        style={styles.icon}
      />
    </View>
  );
}

export default LoginEmailInput;

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
