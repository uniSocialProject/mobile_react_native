import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";

const RegisterStep3 = ({
  setStep,
  setIsValid,
  data,
  isValid,
  setData,
  isPasswordSecure,
  registerHandler,
  setIsPasswordSecure,
  uniMail
}) => {
  function checkForm(data) {
    if (data.email == "" || data.password == "") {
      setIsValid(false);
      return;
    }
    if (!data.email.includes("@")) {
      showMessage({
        message: "Hata!",
        description: "Geçerli bir mail adresi giriniz.",
        type: "danger",
      });
      return;
    }
    if (data.password.length < 6) {
      showMessage({
        message: "Hata!",
        description: "Şifreniz 6 karakterden az olamaz.",
        type: "danger",
      });
      return;
    }
    registerHandler(data);
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Text style={styles.step_info}>Giriş Bilgileri</Text>
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={isValid ? styles.input : styles.input_error}
          value={data.email}
          onChangeText={(value) => setData({ ...data, email: value })}
          placeholder="Email"
        />
        <MaterialIcons
          name="alternate-email"
          size={20}
          color="black"
          style={styles.icon}
        />
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={isValid ? styles.input : styles.input_error}
          value={data.password}
          onChangeText={(value) => setData({ ...data, password: value })}
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

      <View>
        <TouchableOpacity
          style={styles.register_button}
          onPress={() => {
            checkForm(data);
            // if (data.email != "" && data.password != "") {
            //   console.log(data.name);
            //   console.log(data.surname);
            //   console.log(data.university);
            //   console.log(data.department);
            //   console.log(data.email);
            //   console.log(data.password);

            //   registerHandler(data);
            //   setIsValid(true);
            // } else {
            //   setIsValid(false);

            // }
          }}
        >
          <Text style={styles.register_button_text}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => {
            setStep(2);
            setIsValid(true);
          }}
        >
          <Text style={styles.login_button_text}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterStep3;
const styles = StyleSheet.create({
  input_container: {
    flexDirection: "row",
    paddingVertical: 0,
    width: "auto",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
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
