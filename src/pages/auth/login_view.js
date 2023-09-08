import { useEffect, useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
export default function LoginPage({navigation}) {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);



  return (
    <SafeAreaView style={styles.safearea_container}>
      <View style={styles.container}>
        <View style={styles.logo_container}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </View>

        <Text style={styles.login_text}>Giriş Yap</Text>
        <View style={styles.input_container}>
          <TextInput style={ isValid ? styles.input : styles.input_error} value={data.email} onChangeText={(value)=>{setData({...data,email: value})}} placeholder="Email" />
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="black"
            style={styles.icon}
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
           style={ isValid ? styles.input : styles.input_error}
           onChangeText={(value)=>{setData({...data,password: value})}}
           value={data.password}
            placeholder="Şifre"
            secureTextEntry={isPasswordSecure}
          />
          <TouchableOpacity
            onPress={() => {
              isPasswordSecure
                ? setIsPasswordSecure(false)
                : setIsPasswordSecure(true);
            }}
          >
            <Octicons
              name={isPasswordSecure ? "eye-closed" : "eye"}
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={styles.forgot_passwd}>Şifrenizi mi unuttunuz?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.login_button} onPress={()=>{
            if(data.email != "" && data.password != ""){
              navigation.navigate("RegisterPage");
              setData({email: "",password: ""})
              setIsValid(true)
            }else{
              setIsValid(false);
            }
          }}>
            <Text style={styles.login_button_text}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.register_button} onPress={()=>navigation.navigate("RegisterPage")}>
            <Text style={styles.register_button_text}>
              Hesabınız yoksa kayıt olun!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  safearea_container: {
    flex: 1,
    justifyContent: "center",
  },
  logo_container: {
    alignItems: "center",
  },
  logo: {
    height: 130,
    width: 300,
  },
  login_text: {
    textAlign: "left",
    fontWeight: "700",
    fontSize: 32,
    paddingVertical: 10,
  },
  input_container: {
    flexDirection: "row",
    paddingVertical: 0,
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  input_error: {
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    flex: 1,
    borderColor: "red",
  },
  forgot_passwd: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1286C8"
  },
  login_button: {
    alignItems: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "#1286C8",
    borderRadius: 10,
  },
  login_button_text: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
  },
  register_button: {
    alignItems: "center",
  },
  register_button_text: {
    fontSize: 18,
    color: "#1286C8",
    fontWeight: "600",
  },
});
