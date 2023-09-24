import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import StepTitle from "../components/step-title";
import EmailInput from "./components/step3/email-input";
import PasswordInput from "./components/step3/password-input";
import RegisterButton from "./components/step3/register-button";
import BackButton from "./components/step3/back-button";

const RegisterStep3 = ({
  setStep,
  setIsValid,
  data,
  isValid,
  setData,
  isPasswordSecure,
  registerHandler,
  setIsPasswordSecure,
}) => {
  function checkForm(data) {
    if (data.email == "" || data.password == "") {
      setIsValid(false);
      return;
    }
    if (!data.email.includes("@")) {
      setIsValid(false);

      showMessage({
        message: "Hata!",
        description: "Geçerli bir mail adresi giriniz.",
        type: "danger",
      });
      return;
    }
    if (data.password.length < 6) {
      setIsValid(false);

      showMessage({
        message: "Hata!",
        description: "Şifreniz 6 karakterden az olamaz.",
        type: "danger",
      });
      return;
    }
    setIsValid(true)
    registerHandler(data);
  }

  return (
    <>
      <StepTitle title="Giriş Bilgileri" />

      <EmailInput isValid={isValid} setData={setData} data={data} />

      <PasswordInput
        isPasswordSecure={isPasswordSecure}
        isValid={isValid}
        setData={setData}
        setIsPasswordSecure={setIsPasswordSecure}
        data={data}
      />

      <RegisterButton checkForm={checkForm} data={data} />

      <BackButton setStep={setStep} setIsValid={setIsValid} />
    </>
  );
};

export default RegisterStep3;

