import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function FavoriteButton({
  isLiked,
  deleteFavoriteHandler,
  postFavoriteHandler,
  itemId,
}) {
  const animationRef = useRef(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        animationRef.current.play(66, 66);
      } else {
        animationRef.current.play(19, 19);
      }
      isFirstRun.current = false;
    }else if(isLiked){
        animationRef.current.play(19, 50);
    }else{
        animationRef.current.play(0, 19);

    }
  }, [isLiked]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          isLiked ? deleteFavoriteHandler(itemId) : postFavoriteHandler(itemId);
        }}
      >
        <LottieView
          ref={animationRef}
          style={{ width: 75, height: 75, marginHorizontal: -5 }}
          source={require("../../../assets/lottie-files/like-animation.json")}
          autoPlay={false}
          loop={false}
        />
      </TouchableOpacity>
    </View>
  );
}

export default FavoriteButton;
