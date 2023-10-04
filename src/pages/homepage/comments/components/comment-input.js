import { StyleSheet, TextInput } from "react-native";

function CommentInput({setComment}){
    return <TextInput
    style={styles.input}
    value={comment}
    onChangeText={(value) =>{setComment(value)}}
    placeholder="Yorum..."
  />
}

export default CommentInput;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    sectionHeader: {
      margin: 10,
      padding: 10,
      fontSize: 18,
      fontWeight: "700",
      borderRadius: 10,
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  
    input_container: {
      flexDirection: "row",
      paddingVertical: 0,
      paddingHorizontal: 10,
      width: "auto",
      alignItems: "center",
      marginVertical: 10,
    },
  
    input: {
      height: 45,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "black",
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
  
  });
  