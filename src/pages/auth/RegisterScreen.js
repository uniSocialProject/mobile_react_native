import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { login, register } from "../../util/auth";
import LoadingOverlay from "../../components/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
export default function RegisterPage({ navigation }) {
  const [step, setStep] = useState(1);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const authCtx = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    surname: "",
    university: "",
    department: "",
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  async function registerHandler(data) {
    setIsLoading(true);
    try {
      const response = await register(data);
      const token = response.token;
      authCtx.authenticate(token);
      navigation.navigate("LoginPage");
    } catch (error) {
      Alert.alert("Bazı şeyler yolunda gitmedi", error, [{ text: "Tamam" }]);
    }

    setIsLoading(false);
  }

  let step1 = (
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

  let step2 = (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text style={styles.step_info}>Okul Bilgileri</Text>
        <Ionicons
          name="school"
          size={20}
          color="black"
          style={{ paddingHorizontal: 5 }}
        />
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={isValid ? styles.input : styles.input_error}
          value={data.university}
          onChangeText={(value) => setData({ ...data, university: value })}
          placeholder="Üniversite"
        />
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={isValid ? styles.input : styles.input_error}
          value={data.department}
          onChangeText={(value) => setData({ ...data, department: value })}
          placeholder="Bölüm"
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.register_button}
          onPress={() => {
            if (data.university != "" && data.department != "") {
              setStep(3);
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
          onPress={() => {
            setStep(1);
            setIsValid(true);
          }}
        >
          <Text style={styles.login_button_text}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  let step3 = (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
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
            if (data.email != "" && data.password != "") {
              console.log(data.name);
              console.log(data.surname);
              console.log(data.university);
              console.log(data.department);
              console.log(data.email);
              console.log(data.password);

              registerHandler(data);
              setIsValid(true);
            } else {
              setIsValid(false);
            }
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

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <SafeAreaView style={styles.safearea_container}>
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/logo.png")}
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.login_text}>{"Kayıt Ol"}</Text>
            <Text style={styles.login_text}>{`${step}/3`}</Text>
          </View>
          {step == 1 && step1}
          {step == 2 && step2}
          {step == 3 && step3}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  safearea_container: {
    flex: 1,
    justifyContent: "center",
  },
  logo_container: {
    alignItems: "center",
  },
  logo: {
    height: 130,
    width: 300,
  },
  login_text: {
    textAlign: "left",
    fontWeight: "700",
    fontSize: 32,
  },
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
