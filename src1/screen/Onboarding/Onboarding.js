// import React from 'react';
// import {
//   SafeAreaView,
//   Image,
//   StyleSheet,
//   FlatList,
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';



// const { width, height } = Dimensions.get('window');


// const slides = [
//   {
//     id: '1',
//     image: require('../../assests/OnboardingOne.png'),
//     title: 'Best Digital Solution',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     id: '2',
//     image: require('../../assests/OnboardingThree.png'),
//     title: 'Achieve Your Goals',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     id: '3',
//     image: require('../../assests/OnboardingThree.png'),
//     title: 'Increase Your Value',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
// ];

// const Slide = ({ item }) => {
//   return (
//     <View style={{ alignItems: 'center' }}>
//       <Image
//         source={item?.image}
//         style={{ height: '75%', width, resizeMode: 'contain' }}
//       />
//       <View>
//         <Text style={styles.title}>{item?.title}</Text>
//         <Text style={styles.subtitle}>{item?.subtitle}</Text>
//       </View>
//     </View>
//   );
// };

// const Onboarding = () => {
//   const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
//   const ref = React.useRef();
//   const navigation = useNavigation();


//   const updateCurrentSlideIndex = e => {
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / width);
//     setCurrentSlideIndex(currentIndex);
//   };

//   const goToNextSlide = () => {
//     const nextSlideIndex = currentSlideIndex + 1;
//     if (nextSlideIndex != slides.length) {
//       const offset = nextSlideIndex * width;
//       ref?.current.scrollToOffset({ offset });
//       setCurrentSlideIndex(currentSlideIndex + 1);
//     }
//   };

//   const skip = () => {
//     const lastSlideIndex = slides.length - 1;
//     const offset = lastSlideIndex * width;
//     ref?.current.scrollToOffset({ offset });
//     setCurrentSlideIndex(lastSlideIndex);
//   };

//   const Footer = () => {
//     return (
//       <View
//         style={{
//           height: height * 0.25,
//           justifyContent: 'space-between',
//           paddingHorizontal: 20,
//         }}>
//         {/* Indicator container */}
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginTop: 20,
//           }}>
//           {/* Render indicator */}
//           {slides.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.indicator,
//                 currentSlideIndex == index && {
//                   backgroundColor: '#f1f1f1',
//                   width: 25,
//                 },
//               ]}
//             />
//           ))}
//         </View>

//         <View style={{ marginBottom: 20 }}>
//           <View style={{ height: 50 }}>

//           </View>
//           <View style={{ flexDirection: 'row', alignSelf:"center"}}>
//             <TouchableOpacity activeOpacity={1}
//               activeOpacity={0.8}
//               style={styles.btn} onPress={() => navigation.navigate('PhoneNumberVerify')}>


//               <Text
//                 style={{
//                   fontWeight: 'bold',
//                   fontSize: 15,
//                   color: '#fff',
//                   backgroundColor: "red"
//                 }}>
//                 GET STARTED
//               </Text>
//             </TouchableOpacity>
//             <View style={{ width: 15 }} />

//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <StatusBar  barStyle="dark-content" backgroundColor='#fff' />
//       <FlatList
//         ref={ref}
//         onMomentumScrollEnd={updateCurrentSlideIndex}
//         contentContainerStyle={{ height: height * 0.75 }}
//         showsHorizontalScrollIndicator={false}
//         horizontal
//         data={slides}
//         pagingEnabled
//         renderItem={({ item }) => <Slide item={item} />}
//       />
//       <Footer />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   subtitle: {
//     color: '#000',
//     fontSize: 13,
//     marginTop: 10,
//     maxWidth: '70%',
//     textAlign: 'center',
//     lineHeight: 23,
//   },
//   title: {
//     color: '#000',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 20,
//     textAlign: 'center',
//   },
//   image: {
//     height: '100%',
//     width: '100%',
//     resizeMode: 'contain',
//   },
//   indicator: {
//     height: 2.5,
//     width: 10,
//     backgroundColor: 'red',
//     marginHorizontal: 3,
//     borderRadius: 2,
//   },
//   btn: {
//     // flex: 1,
//     height: 50,
//     width:220,
//     borderRadius: 20,
//     backgroundColor: '#DC2430',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf:"center"

//   },
// });
// export default Onboarding;
import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#fff' };

const slides = [
  {
    id: '1',
    image: require('../../assests/OnboardingOne.png'),
    title: 'Less interest rate',
    subtitle: 'Less interest rate to repay the loan!',
  },
  {
    id: '2',
    image: require('../../assests/OnboardingThree.png'),
    title: 'Easiest way to get loan',
    subtitle: 'Very easy to get loan with just few click!',
  },
  {
    id: '3',
    image: require('../../assests/mobag.png'),
    title: 'Instant loan',
    subtitle: 'The easiest way to get loan from your phone with basic formality!',
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={item?.image}
        style={{ height: '60%', width, resizeMode: 'contain' }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: '#B53059',
                  width: 25,
                  height: 5
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {/* {currentSlideIndex == slides.length - 1 ? ( */}
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.replace('PermissionsPg')}>
              {/* onPress={() => navigation.replace('PhoneNumberVerify')}> */}
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: "#fff" }}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle='dark-content' backgroundColor={'#fff'} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#000',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 5,
    width: 25,
    backgroundColor: '#A7A7A7',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#B53059',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Onboarding;