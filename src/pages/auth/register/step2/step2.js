import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const RegisterStep2 = ({
  setStep,
  setIsValid,
  toggleUniversitiesSheet,
  data,
  isValid,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Text style={styles.step_info}>Okul Bilgileri</Text>
      
      </View>

      <TouchableOpacity
        onPress={() => {
          toggleUniversitiesSheet();
        }}
      >
        <View
          style={
            data.university != "" && data.department
              ? styles.button_container_success
              : isValid
              ? styles.button_container
              : styles.button_container_error
          }
        >
          <Text>
            {data.university != "" && data.university != undefined
              ? `${data.university} & ${data.department}`
              : "Üniversite & Bölüm"}
          </Text>
        </View>
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          style={styles.register_button}
          onPress={() => {
            if (
              data.university != "" &&
              data.department != "" &&
              data.department != undefined &&
              data.university != undefined
            ) {
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
};

export default RegisterStep2;

const styles = StyleSheet.create({
  button_container: {
    flexDirection: "row",
    paddingVertical: 0,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
  },
  button_container_success: {
    flexDirection: "row",
    paddingVertical: 0,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    borderColor: "green",
    justifyContent: "center",
  },
  button_container_error: {
    flexDirection: "row",
    paddingVertical: 0,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    height: 45,
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
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
