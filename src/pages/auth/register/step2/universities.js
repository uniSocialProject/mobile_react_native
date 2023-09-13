import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const UniversityList = ({ toggle }) => {
  const universities = require("../../../../constants/universities.json");

  const [university, setUniversity] = useState(undefined);

  return (
    <View style={styles.container}>
      <FlatList
        data={university == undefined ? universities : [university]}
        contentContainerStyle={{ paddingBottom: 300 }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            {university && (
              <>
                <TouchableOpacity style={styles.back_button}>
                  <Ionicons
                    size={30}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                    }}
                    onPress={() => {
                      setUniversity();
                    }}
                    name="chevron-back-sharp"
                  />
                </TouchableOpacity>
                {item.faculties.map((faculty) => {
                  return (
                    <>
                      <Text key={faculty.name} style={styles.sectionHeader}>
                        {faculty.name}
                      </Text>
                      {faculty.departments.map((department) => {
                        return (
                          <TouchableOpacity
                            key={department.name}
                            onPress={() => {
                              toggle(university.name, department.name);
                            }}
                          >
                            <Text key={department.name} style={styles.item}>
                              {department.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  );
                })}
              </>
            )}
            {!university && (
              <>
                <Text key={item.id} style={styles.sectionHeader}>
                  {item.province}
                </Text>
                {item.universities.map((university) => {
                  return (
                    <TouchableOpacity
                      key={university.name}
                      onPress={() => {
                        setUniversity(university);
                      }}
                    >
                      <Text key={university.name} style={styles.item}>
                        {university.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            )}
          </>
        )}
      />
    </View>
  );
};

export default UniversityList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
    fontWeight: "400",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: "700",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  back_button: {
    padding: 5,
  },
});
