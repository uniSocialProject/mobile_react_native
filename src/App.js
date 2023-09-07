import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./pages/auth/login_view";
import RegisterPage from "./pages/auth/register_view";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashPage from "./pages/splash/splash_view";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, animation: "fade"}} initialRouteName="SplashPage">
        <Stack.Screen name="LoginPage"  component={LoginPage}/>
        <Stack.Screen name="RegisterPage" component={RegisterPage}/>
        <Stack.Screen name="SplashPage" component={SplashPage}/>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
