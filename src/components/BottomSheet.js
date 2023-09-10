import { Dimensions, Modal, Pressable, StyleSheet, Text, View, ScrollView} from "react-native";
import { FlatList, Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import SectionListBasics from "./Universities";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


const persons = [
    {
      id: "1",
      name: "Earnest Green",
    },
    {
      id: "2",
      name: "Winston Orn",
    },
    {
        id: "3",
        name: "Winston Orn",
      },
      {
        id: "4",
        name: "Winston Orn",
      },
      {
        id: "5",
        name: "Winston Orn",
      },
      {
        id: "6",
        name: "Winston Orn",
      },
      {
        id: "7",
        name: "Winston Orn",
      },


  ];

const BottomSheet = ({ toggleSheet, children }) => {

    const offset = useSharedValue(0);

    const translateY = useAnimatedStyle(()=>({
        transform: [{translateY: offset.value}]
    }))

    const pan = Gesture.Pan().onChange((event)=>{
        const offsetData = event.changeY + offset.value
        const clamp = Math.max(-SCREEN_HEIGHT/0.2,offsetData)
        offset.value = offsetData > 0 ? offsetData : withSpring(clamp);
    }).onFinalize(()=>{
        if(offset.value < SCREEN_HEIGHT /3){
            offset.value = withSpring(0)
        }else{
            offset.value = withTiming(SCREEN_HEIGHT, {},()=>{
                runOnJS(toggleSheet)();
            })
        }
    })

  return (
    <>
      <AnimatedPressable style={styles.backdrop} entering={FadeIn} exiting={FadeOut} onPress={() => toggleSheet()} />
      <GestureDetector gesture={pan}>
      <Animated.View
        entering={SlideInDown.springify().damping(20)}
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
    zIndex: 1
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    textAlign: "center"
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
