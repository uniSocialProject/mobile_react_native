import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
 
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BottomSheet = ({ toggle, children }) => {
  const offset = useSharedValue(0);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetData = event.changeY + offset.value;
      const clamp = Math.max(-SCREEN_HEIGHT / 0.2, offsetData);
      offset.value = offsetData > 0 ? offsetData : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < SCREEN_HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(SCREEN_HEIGHT, {}, () => {
          runOnJS(toggle)();
        });
      }
    });


  return (
    <>
      <AnimatedPressable
        style={styles.backdrop}
        entering={FadeIn}
        exiting={FadeOut}
        onPress={() => toggle()}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          entering={SlideInDown.springify().damping(30)}
          exiting={SlideOutDown}
          style={[styles.bottomSheetContainer, translateY]}
        >
          <View style={styles.line}></View>

          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT / 2.5,
    borderRadius: 25,
    zIndex: 1,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,

    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
 
});

export default BottomSheet;
