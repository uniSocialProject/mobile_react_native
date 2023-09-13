import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const RegisterStep1 = ({
  setStep,
  setIsValid,
  data,
  isValid,
  setData,
  navigation,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text style={styles.step_info}>Öğrenci Bilgileri</Text>
        <AntDesign
          name="user"
          size={20}
          color="black"
          style={{ paddingHorizontal: 5 }}
        />
      </View>

      <View style={styles.input_container}>
        <TextInput
          style={isValid ? styles.input : styles.input_error}
          value={data.name}
          onChangeText={(value) => setData({ ...data, name: value })}
          placeholder="Ad"
        />
      </View>

      <View style={styles.input_container}>
        <TextInput
          style={isValid ? styles.input : styles.input_error}
          value={data.surname}
          onChangeText={(value) => setData({ ...data, surname: value })}
          placeholder="Soyad"
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.register_button}
          onPress={() => {
            if (data.name != "" && data.surname != "") {
              setStep(2);
              setIsValid(true);
            } else {
              setIsValid(false);
            }
          }}
        >
          <Text style={styles.register_button_text}>Devam Et</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => navigation.navigate("LoginPage")}
        >
          <Text style={styles.login_button_text}>
            Hesabınız varsa giriş yapın!
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterStep1;

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
