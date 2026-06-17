import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Carousel from './Carousel';
import { getAppBanner } from '../../redux/slices/userSlice';
// import { getAppBanner } from '../../redux/slices/userSlice';

interface Props {
    navigation?: any;
}

const SlidMain: React.FC<Props> = ({ navigation }) => {

    const dispatch = useDispatch<any>();

    const bannerData = useSelector(
        (state: any) => state.user.bannerData
    );

    useEffect(() => {
        dispatch(getAppBanner());
    }, []);

    // API response convert for carousel
    const formattedData =
        bannerData?.map((item: any) => ({
            id: item.id,
            url: item.image,
        })) || [];

    return (
        <View>
            <Carousel data={formattedData} />
        </View>
    );
};

export default SlidMain;
// import React from 'react';
// import { View } from 'react-native';
// import Carousel from './Carousel';
// import { dummyData } from './data';

// interface Props {
//     navigation?: any;
// }

// const SlidMain: React.FC<Props> = ({ navigation }) => {
//     return (
//         <View>
//             <Carousel data={dummyData} />
//         </View>
//     );
// };

// export default SlidMain;