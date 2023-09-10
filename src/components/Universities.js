import React from 'react';
import {ScrollView, SectionList, StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const UniversitiesSectionList = ({toggle}) => {
  return (
    <>
    <View style={styles.container}>
      <SectionList
        scrollEnabled={true}
        scrollToOverflowEnabled={true}
        
        sections={[
          {title: 'K', data: ['Karadeniz Technical University']},
          {
            title: 'S',
            data: [
              'Selçuk University',
              
            ],
          },
        ]}
        renderItem={({item}) => <TouchableOpacity onPress={()=>{toggle(item)}}><Text style={styles.item}>{item}</Text></TouchableOpacity>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
    </>
  );
};

export default UniversitiesSectionList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  
  