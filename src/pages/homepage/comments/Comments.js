import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const Comments = ({ comments}) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Comments;

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
 
});
