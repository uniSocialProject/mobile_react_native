import { Image, StyleSheet, View } from "react-native";

function Logo(props) {
  return (
    <View style={styles.logo_container}>
      <Image
        style={{height: props.height, width: props.width}}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  
    logo_container: {
      alignItems: "center",
    },
    
   
  });
  