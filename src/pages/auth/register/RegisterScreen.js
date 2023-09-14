import { useContext, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { register } from "../../../util/auth";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { AuthContext } from "../../../store/auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../../../components/BottomSheet";
import UniversityList from "./step2/universities";
import RegisterStep2 from "./step2/step2";
import RegisterStep1 from "./step1/step1";
import RegisterStep3 from "./step3/step3";

import FlashMessage, { showMessage } from "react-native-flash-message";

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
      setIsLoading(false);
    } catch (error) {
      showMessage({
        message: "Hata!",
        description: error,
        type: "danger",
      });
      setIsLoading(false);
    }
  }

  const [isUniversitiesOpen, setUniversitiesOpen] = useState(false);

  const toggleUniversitiesSheet = (university, department) => {
    data.university = university;
    data.department = department;
    setUniversitiesOpen(!isUniversitiesOpen);
  };

  let step1 = (
    <RegisterStep1
      setStep={setStep}
      setIsValid={setIsValid}
      data={data}
      setData={setData}
      navigation={navigation}
      isValid={isValid}
    />
  );

  let step2 = (
    <RegisterStep2
      setStep={setStep}
      setIsValid={setIsValid}
      toggleUniversitiesSheet={toggleUniversitiesSheet}
      data={data}
      isValid={isValid}
    />
  );

  let step3 = (
    <RegisterStep3
      setStep={setStep}
      setIsValid={setIsValid}
      data={data}
      setData={setData}
      navigation={navigation}
      isValid={isValid}
      isPasswordSecure={isPasswordSecure}
      registerHandler={registerHandler}
      setIsPasswordSecure={setIsPasswordSecure}
    />
  );

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isLoading && <LoadingOverlay />}

        <SafeAreaView style={styles.safearea_container}>
          <View style={styles.container}>
            <View style={styles.logo_container}>
              <Image
                style={styles.logo}
                source={require("../../../assets/images/logo.png")}
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

        {isUniversitiesOpen && (
          <BottomSheet
            children={<UniversityList toggle={toggleUniversitiesSheet} />}
            toggle={toggleUniversitiesSheet}
          />
        )}
      </GestureHandlerRootView>
      <FlashMessage position="top" />
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
});
