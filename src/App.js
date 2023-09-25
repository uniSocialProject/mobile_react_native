import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./pages/sign-in/login-page";
import RegisterPage from "./pages/sign-up/register-page";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashPage from "./pages/splash/SplashScreen";
import HomePage from "./pages/homepage/home-page";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

import ProfilePage from "./pages/profile/profile-page";
import SharePostPage from "./pages/homepage/share-post/share-post-page";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
      initialRouteName="HomePage"
    >
      <Stack.Screen name="SharePostPage" component={SharePostPage} />
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        tabBarActiveTintColor: "#1286C8",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          padding: 0,
          backgroundColor: "white",
          borderRadius: 0,
          margin: 0, //Padding 0 here
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
      initialRouteName="SplashPage"
    >
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="SplashPage" component={SplashPage} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'MontserratAlternates-Black' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-Black.ttf"),
    'MontserratAlternates-BlackItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-BlackItalic.ttf"),
    'MontserratAlternates-Bold' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-Bold.ttf"),
    'MontserratAlternates-BoldItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-BoldItalic.ttf"),
    'MontserratAlternates-ExtraBold' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-ExtraBold.ttf"),
    'MontserratAlternates-ExtraBoldItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-ExtraBoldItalic.ttf"),
    'MontserratAlternates-ExtraLight' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-ExtraLight.ttf"),
    'MontserratAlternates-ExtraLightItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-ExtraLightItalic.ttf"),
    'MontserratAlternates-Italic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-Italic.ttf"),
    'MontserratAlternates-Light' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-Light.ttf"),
    'MontserratAlternates-LightItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-LightItalic.ttf"),
    'MontserratAlternates-Medium' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-Medium.ttf"),
    'MontserratAlternates-MediumItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-MediumItalic.ttf"),
    'MontserratAlternates-Regular' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-Regular.ttf"),
    'MontserratAlternates-SemiBold' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-SemiBold.ttf"),
    'MontserratAlternates-SemiBoldItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-SemiBoldItalic.ttf"),
    'MontserratAlternates-Thin' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-Thin.ttf"),
    'MontserratAlternates-ThinItalic' : require("./assets/fonts/montserrat-alternates/MontserratAlternates-ThinItalic.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
