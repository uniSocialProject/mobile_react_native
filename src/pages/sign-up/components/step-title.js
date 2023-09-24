import { StyleSheet, Text, View } from "react-native";

function StepTitle(props) {
  return (
    <View style={styles.title_container}>
      <Text style={styles.step_info}>{props.title}</Text>
    </View>
  );
}

export default StepTitle;

const styles = StyleSheet.create({
  title_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  step_info: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 22,
  },
});
