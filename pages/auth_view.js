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
import * as Font from 'expo-font';


import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
export default function AuthPage() {



   const [isPasswordSecure,setIsPasswordSecure] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.logo_container}> 
          <Image
            style={{ height: 130, width: 400}}
            source={require("../assets/images/unisocial_logo.png")}
          />
        </View>

        <View style={styles.form_container}>
          <Text style={{ textAlign: "left", fontWeight: "600", fontSize: 32, paddingVertical: 10}}>
            Giriş Yap
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 0,
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TextInput style={styles.input} placeholder="Email" />
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="black"
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 0,
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TextInput style={styles.input} placeholder="Şifre" secureTextEntry={isPasswordSecure} />
            <TouchableOpacity onPress={()=>{isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true)}}>
              <Octicons
                name={isPasswordSecure ? "eye-closed" : "eye"}
                size={20}
                color="black"
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={{fontSize: 16,fontWeight: 400}}>Şifrenizi mi unuttunuz?</Text>
            </TouchableOpacity>
          </View>
          </View>

          

          <View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                margin: 20,
                padding: 20,
                backgroundColor: "#1286C8",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 18, color: "white" }}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
         
            <TouchableOpacity style={{alignItems: "center"}}>
              <Text style={{fontSize: 16,color: "#1286C8",fontWeight: "600"}}>Hesabınız yoksa kayıt olun!</Text>
            </TouchableOpacity>
        
          </View>
         
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo_container: {
    alignItems: "center",
  },
  form_container: {},
  input: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
});
