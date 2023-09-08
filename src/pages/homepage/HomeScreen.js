import { useContext } from "react";
import { Button, Text } from "react-native";
import { AuthContext } from "../../store/auth-context";

export default function HomePage({ navigation }) {
  const authCtx = useContext(AuthContext);
  return (
    <>
    <Button
    title="Çık"
      onPress={() => {
        authCtx.logout();
      }}
    />
    
    <Text>{authCtx.token}</Text>
    </>
  );
}
