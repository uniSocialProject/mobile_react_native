import {
  StyleSheet,
} from "react-native";
import StepTitle from "../components/step-title";
import RegisterInputs from "../components/input-fields";
import ButtonStep1 from "./components/step1/button-step1";
import LoginButton from "./components/step1/login-button";

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
      <StepTitle title="Öğrenci Bilgileri" />

      <RegisterInputs
        placeholder="Ad"
        value={data.name}
        onChangeText={(value) => setData({ ...data, name: value })}
        isValid={isValid}
      />

      <RegisterInputs
        placeholder="Soyad"
        value={data.surname}
        onChangeText={(value) => setData({ ...data, surname: value })}
        isValid={isValid}
      />

      <ButtonStep1 setIsValid={setIsValid} setStep={setStep} data={data} />

      <LoginButton navigation={navigation} />
    </>
  );
};

export default RegisterStep1;

