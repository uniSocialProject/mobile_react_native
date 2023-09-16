import { useContext, useEffect, useState } from "react";
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

import { login } from "../../../util/auth";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import { AuthContext } from "../../../store/auth-context";
import Logo from "../../../components/ui/Logo";
import LoginText from "../../../components/login-page/LoginText";
import LoginEmailInput from "../../../components/login-page/LoginEmailInput";
import LoginPasswordInput from "../../../components/login-page/LoginPasswordInput";
import ForgotPasswordText from "../../../components/login-page/ForgotPasswordText";
export default function LoginPage({ navigation }) {
  const authCtx = useContext(AuthContext);

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  async function loginHandler(email, password) {
    setIsLoading(true);
    try {
      const response = await login(email, password);
      const token = response.token;
      authCtx.authenticate(token);
      setIsLoading(false);
    } catch (error) {
      console.log("hata");
      Alert.alert("Bazı şeyler yolunda gitmedi", error, [{ text: "Tamam" }]);
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <View style={styles.safearea_container}>
        <View style={styles.container}>

          <Logo width={300} height={130} />

          <LoginText />
          
          <LoginEmailInput data={data} setData={setData} isValid={isValid} />
          
          <LoginPasswordInput
            data={data}
            setData={setData}
            isPasswordSecure={isPasswordSecure}
            isValid={isValid}
            setIsPasswordSecure={setIsPasswordSecure}
          />

         <ForgotPasswordText />

          <View>
            <TouchableOpacity
              style={styles.login_button}
              onPress={() => {
                if (data.email != "" && data.password != "") {
                  console.log(data.email, data.password);
                  loginHandler(data.email, data.password);
                  setData({ email: "", password: "" });
                  setIsValid(true);
                } else {
                  setIsValid(false);
                }
              }}
            >
              <Text style={styles.login_button_text}>Giriş Yap</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.register_button}
              onPress={() => navigation.navigate("RegisterPage")}
            >
              <Text style={styles.register_button_text}>
                Hesabınız yoksa kayıt olun!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
 
  login_button: {
    alignItems: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "#1286C8",
    borderRadius: 10,
  },
  login_button_text: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
  },
  register_button: {
    alignItems: "center",
  },
  register_button_text: {
    fontSize: 18,
    color: "#1286C8",
    fontWeight: "600",
  },
});
