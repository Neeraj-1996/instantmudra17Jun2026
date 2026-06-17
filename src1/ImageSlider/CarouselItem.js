import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={{ uri: item.url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 10,
    height: 140,
    backgroundColor: '#DC2430',
    borderRadius: 10,
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    marginTop: 5,
    margin: 5,
  },

  image: {
    width: width - 10,
    height: 140,
    borderRadius: 10,
  },
});

export default CarouselItem;
