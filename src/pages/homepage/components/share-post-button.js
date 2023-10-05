import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";


function SharePostButton({setIsShareOpen}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setIsShareOpen(true);
      }}
    >
      <Entypo name="plus" size={30} color="#1286C8" />
    </TouchableOpacity>
  );
}

export default SharePostButton;
