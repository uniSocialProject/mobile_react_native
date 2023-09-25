import { StyleSheet, Text } from "react-native";

function LoginText(){
    return  <Text style={styles.login_text}>Giriş Yap</Text>
}

export default LoginText;

const styles = StyleSheet.create({
    login_text: {
        textAlign: "left",
      
        fontFamily: 'MontserratAlternates-Medium',
        fontSize: 32,
        paddingVertical: 10,
      }
})