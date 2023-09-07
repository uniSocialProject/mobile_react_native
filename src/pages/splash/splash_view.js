import { useEffect } from "react";
import { StyleSheet, View,Image } from "react-native";

export default function SplashPage({navigation}){


     

    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate("LoginPage");
        }, 2000);
    },[]);

    return (
        <View style={styles.logo_container}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </View>
    )
}

const styles = StyleSheet.create({
  
    logo_container: {
      
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    
    },
    logo: {
      height:200,
      width: 300
    },
    
  });
  