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

import { login } from "../../service/auth/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import Logo from "../../components/ui/Logo";
import LoginText from "./components/login-text";
import LoginEmailInput from "./components/email-input";
import LoginPasswordInput from "./components/password-input";
import ForgotPasswordText from "./components/forgot-passwd-text";
import LoginButton from "./components/login-button";
import RegisterButton from "./components/register-button";
import FlashMessage, { showMessage } from "react-native-flash-message";
export default function LoginPage({ navigation }) {


  const authCtx = useContext(AuthContext);

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler() {
    setIsLoading(true);
    try {
      const response = await login(data.email,data.password);
      const token = response.token;
      authCtx.authenticate(token);
      console.log(data.email, data.password);

      setIsLoading(false);
    } catch (error) {
      console.log("hata");
      console.log(error);

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

          <LoginButton
            setIsValid={setIsValid}
            data={data}
            setData={setData}
            loginHandler={loginHandler}
          />

          <RegisterButton navigation={navigation} />
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
});
