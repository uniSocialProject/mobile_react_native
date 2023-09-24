import StepTitle from "../components/step-title";
import UniButton from "./components/step2/uni-button";
import ButtonStep2 from "./components/step2/button-step2";
import BackButton from "./components/step2/back-button";

const RegisterStep2 = ({
  setStep,
  setIsValid,
  toggleUniversitiesSheet,
  data,
  isValid,
}) => {
  return (
    <>
      <StepTitle title="Okul Bilgileri" />

      <UniButton
        data={data}
        toggleUniversitiesSheet={toggleUniversitiesSheet}
        isValid={isValid}
      />

      <ButtonStep2 setIsValid={setIsValid} setStep={setStep} data={data} />

      <BackButton setIsValid={setIsValid} setStep={setStep} />
    </>
  );
};

export default RegisterStep2;

