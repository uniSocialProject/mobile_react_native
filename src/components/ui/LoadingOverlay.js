import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";

function LoadingOverlay(props) {
  return (
    
    <Modal transparent statusBarTranslucent={true}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
     
        }}
      >
          <Image
            style={styles.logo}
            source={require("../../assets/gifs/loadingSpinnerGif.gif")}
          />
      </View>
    </Modal>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  
  
  logo: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    height: 75,
    width: 75,
    
  },
 
});
