import { StyleSheet, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
export default function Stepper({step}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
          borderColor: step == 1 ? "black" : "green",
        }}
      >
        <AntDesign
          name={step == 1 ? "user" : "check"}
          size={25}
          color={step == 1 ? "black" : "green"}
          style={{ paddingHorizontal: 5 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 2,
          backgroundColor: step == 1 ? "black" : "green",
        }}
      />
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
          borderColor: step > 2 ? "green" : "black",
        }}
      >
        {step > 2 ? (
          <AntDesign
            name="check"
            size={25}
            color="green"
            style={{ paddingHorizontal: 5 }}
          />
        ) : (
          <Ionicons
            name="school"
            size={20}
            color="black"
            style={{ paddingHorizontal: 5 }}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          height: 2,
          backgroundColor: step > 2 ? "green" : "black",
        }}
      />
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "black",
        }}
      >
        <Ionicons
          name="key"
          size={20}
          color="black"
          style={{ paddingHorizontal: 5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    stepper_container: {
        
    }
  });