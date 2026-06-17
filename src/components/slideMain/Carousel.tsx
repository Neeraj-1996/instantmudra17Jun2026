import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import CarouselItem from './CarouselItem';

const { width, height } = Dimensions.get('window');

export interface CarouselData {
    id: number;
    url: string;
}

interface Props {
    data: CarouselData[];
}

function infiniteScroll(
    // dataList: CarouselData[],
    // mySlide: React.RefObject<FlatList<CarouselData>>
    dataList: CarouselData[],
    mySlide: React.RefObject<FlatList<CarouselData> | null>
) {
    const numberOfData = dataList.length;
    let scrollValue = 0;
    let scrolled = 0;

    return setInterval(() => {
        scrolled++;
        if (scrolled < numberOfData) {
            scrollValue = scrollValue + width;
        } else {
            scrollValue = 0;
            scrolled = 0;
        }

        mySlide.current?.scrollToOffset({
            animated: true,
            offset: scrollValue,
        });
    }, 4000);
}

const Carousel: React.FC<Props> = ({ data }) => {
    // const mySlide = useRef<FlatList<CarouselData>>(null);
    const mySlide = useRef<FlatList<CarouselData>>(null);

    const scrollX = useRef(new Animated.Value(0)).current;

    const position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState<CarouselData[]>(data);

    useEffect(() => {
        setDataList(data);

        const interval = infiniteScroll(data, mySlide);

        return () => clearInterval(interval);
    }, [data]);

    if (data && data.length) {
        return (
            <View>
                <FlatList
                    data={dataList}
                    ref={mySlide}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CarouselItem item={item} />}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />

                <View style={styles.dotView}>
                    {dataList.map((_, i) => {
                        const opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                key={i}
                                style={[
                                    styles.dot,
                                    {
                                        opacity,
                                    },
                                ]}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }

    // console.log('Please provide Images');
    return null;
};

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 5,
    },
});

export default Carousel;