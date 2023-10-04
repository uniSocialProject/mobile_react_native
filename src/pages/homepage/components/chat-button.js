import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

function ChatButton({authCtx}){
    return <TouchableOpacity
    onPress={() => {
      authCtx.logout();
    }}
  >
    <Entypo
      name="message"
      style={{ paddingHorizontal: 10 }}
      size={30}
      color="#1286C8"
    />
  </TouchableOpacity>
}

export default ChatButton;