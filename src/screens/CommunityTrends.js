import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';




function CommunityTrends({navigation}) {


  // const [reviews, setReviews] = useState([
  //   {title: 'test111', rating: 5, body: "alsdfj", key: "1"},
  //   {title: 'test222', rating: 5, body: "badfa", key: "2"},
  //   {title: 'test333', rating: 5, body: "ckjfafj", key: "3"}
  // ]);

  const reviews1 = [
    {title: 'test111', rating: 5, body: "alsdfj", key: "1"},
    {title: 'test222', rating: 5, body: "badfa", key: "2"},
    {title: 'test333', rating: 5, body: "ckjfafj", key: "3"}
  ]
  return (
    <View>
      <FlatList data={reviews1}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Settings', item)}>
                    <Text>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )} />

    </View>
  );
}


const styles = StyleSheet.create({
  
})


export default CommunityTrends;