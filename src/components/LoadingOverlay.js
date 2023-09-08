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
    <Modal transparent >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.logo_container}>
          <Image
            style={styles.logo}
            source={require("../assets/gifs/loadingSpinnerGif.gif")}
          />
        </View>
      </View>
    </Modal>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  logo_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    height: 75,
    width: 75,
  },
  modalView: {
    alignItems: "center",
  },
});
