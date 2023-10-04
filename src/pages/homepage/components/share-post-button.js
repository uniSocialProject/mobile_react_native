import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";


function SharePostButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SharePostPage");
      }}
    >
      <Entypo name="plus" size={30} color="#1286C8" />
    </TouchableOpacity>
  );
}

export default SharePostButton;
