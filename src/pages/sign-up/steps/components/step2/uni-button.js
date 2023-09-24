import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function UniButton({data,toggleUniversitiesSheet,isValid}) {
  return (
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
  );
}

export default UniButton;

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
  