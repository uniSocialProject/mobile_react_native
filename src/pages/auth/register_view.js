import { useState } from "react";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function RegisterPage({navigation}) {
  const [step, setStep] = useState(1);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  let step1 = (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text style={styles.step_info}>Öğrenci Bilgileri</Text>
        <AntDesign name="user" size={20} color="black" style={{paddingHorizontal: 5}} />
      </View>


      <View style={styles.input_container}>
        <TextInput style={styles.input} placeholder="Ad" />
      </View>

      <View style={styles.input_container}>
        <TextInput style={styles.input} placeholder="Soyad" />
      </View>

      <View>
        <TouchableOpacity
          style={styles.register_button}
          onPress={() => setStep(2)}
        >
          <Text style={styles.register_button_text}>Devam Et</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.login_button} onPress={()=>navigation.navigate("LoginPage")}>
          <Text style={styles.login_button_text}>
            Hesabınız varsa giriş yapın!
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  let step2 = (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text style={styles.step_info}>Okul Bilgileri</Text>
        <Ionicons name="school" size={20} color="black" style={{paddingHorizontal: 5}} />
      </View>
      <View style={styles.input_container}>
        <TextInput style={styles.input} placeholder="Üniversite" />
        
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder="Bölüm"
          secureTextEntry={isPasswordSecure}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.register_button}
          onPress={() => setStep(3)}
        >
          <Text style={styles.register_button_text}>Devam Et</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => setStep(1)}
        >
          <Text style={styles.login_button_text}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  let step3 = (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text style={styles.step_info}>Giriş Bilgileri</Text>
      
      </View>
      <View style={styles.input_container}>
        <TextInput style={styles.input} placeholder="Email" />
        <MaterialIcons
          name="alternate-email"
          size={20}
          color="black"
          style={styles.icon}
        />
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
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
        <TouchableOpacity style={styles.register_button}>
          <Text style={styles.register_button_text}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => setStep(2)}
        >
          <Text style={styles.login_button_text}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safearea_container}>
      <View style={styles.container}>
        <View style={styles.logo_container}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={styles.login_text}>{"Kayıt Ol"}</Text>
        <Text style={styles.login_text}>{`${step}/3`}</Text>
        </View>
        {step == 1 && step1}
        {step == 2 && step2}
        {step == 3 && step3}
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
  },
  input_container: {
    flexDirection: "row",
    paddingVertical: 0,
    width: "auto",
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
 
  register_button: {
    alignItems: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "#1286C8",
    borderRadius: 10,
  },
  register_button_text: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
  },
  login_button: {
    alignItems: "center",
  },
  login_button_text: {
    fontSize: 18,
    color: "#1286C8",
    fontWeight: "600",
  },
  step_info: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 22,
  },
});
