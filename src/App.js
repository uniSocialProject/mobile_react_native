import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./pages/auth/login/LoginScreen";
import RegisterPage from "./pages/auth/register/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashPage from "./pages/splash/SplashScreen";
import HomePage from "./pages/homepage/HomeScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          padding:0,
          backgroundColor: "red",
          borderRadius: 0,
          margin: 0, //Padding 0 here
        },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
