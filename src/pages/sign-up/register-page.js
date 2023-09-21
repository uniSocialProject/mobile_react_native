import { useContext, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { register } from "../../service/auth/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../../components/ui/BottomSheet";
import UniversityList from "./components/uni-bottomsheet";
import RegisterStep2 from "./steps/step-2";
import RegisterStep1 from "./steps/step-1";
import RegisterStep3 from "./steps/step-3";

import FlashMessage, { showMessage } from "react-native-flash-message";
import Stepper from "./components/stepper-icons";
import Logo from "../../components/ui/Logo";

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
            <Logo width={300} height={130} />

            <Stepper step={step} />

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
  login_text: {
    textAlign: "left",
    fontWeight: "700",
    fontSize: 32,
  },
});
