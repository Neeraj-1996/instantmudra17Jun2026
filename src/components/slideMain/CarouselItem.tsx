import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { CarouselData } from './Carousel';

const { width } = Dimensions.get('window');

interface Props {
    item: CarouselData;
}

const CarouselItem: React.FC<Props> = ({ item }) => {
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