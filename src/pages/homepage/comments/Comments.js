import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Comments({ comments, postCommentHandler }) {

  const [comment,setComment] = useState("");



  return (
    <View style={styles.container}>
       <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={(value) =>{setComment(value)}}
          placeholder="Yorum..."
        />
      <TouchableOpacity onPress={()=>{postCommentHandler(comment); setComment("")}}>
        <View style={{borderRadius: 5, borderWidth: 2,padding: 10,marginHorizontal: 10}}>
        <Text>PAYLAŞ</Text>
        </View>
        </TouchableOpacity>        
      </View>
      {comments.length == 0 ? (
        <View style={{justifyContent: "center", alignItems: "center",padding: 30}}>
        <Text>Henüz hiç yorum yok...</Text>
        </View>
      ) : (
        <FlatList
          data={comments}
          contentContainerStyle={{ paddingBottom: 300 }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              <Text style={styles.sectionHeader}>{item.description}</Text>
            </>
          )}
        />
      )}
    </View>
  );
};


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
