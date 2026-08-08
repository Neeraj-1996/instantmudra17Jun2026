import React, { useRef, useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Text,
} from "react-native";

import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import GradientBackground from "../../components/gradient/GradinetBackgorund";
import { Colors } from "../../styles/colors";
import styles from "./Onboarding.style";

import {
    WhyPay,
    GetApply,
    Apply3,
    ArrowOnboading,
} from "../../assets/images";
import { moderateScale } from "../../styles/responsive";

const { width, height } = Dimensions.get("window");

const slides = [
    {
        image: WhyPay,
    },
    {
        image: GetApply,
    },
    {
        image: Apply3,
    },
];

const OnboardingScreen = ({ navigation }: any) => {
    const flatListRef = useRef<FlatList>(null);
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: step + 1,
                animated: true,
            });
        } else {
            navigation.replace("RegistrationScreen");
        }
    };

    const onMomentumScrollEnd = (event: any) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / width
        );
        setStep(index);
    };

    const renderItem = ({ item }: any) => (
        <View
            style={{
                width,
                height,
            }}
        >
            <Image
                source={item.image}
                style={{
                    width: "100%",
                    height: "90%",
                }}
                resizeMode="cover"
            />
        </View>
    );

    return (
        <ScreenWrapper
            backgroundColor={Colors.crimson}
            barStyle="light-content"
        >
            <GradientBackground>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatListRef}
                        data={slides}
                        renderItem={renderItem}
                        horizontal
                        pagingEnabled
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onMomentumScrollEnd={onMomentumScrollEnd}
                    />

                    <View
                        style={{
                            position: "absolute",
                            bottom: 20,
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        {step === slides.length - 1 ? (
                            <TouchableOpacity
                                onPress={handleNext}
                                style={{
                                    backgroundColor: "#fff",
                                    paddingHorizontal: 35,
                                    paddingVertical: 14,
                                    borderRadius: 30,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#000",
                                        fontSize: 16,
                                        fontWeight: "700",
                                    }}
                                >
                                    Get Started
                                </Text>
                            </TouchableOpacity>
                        ) : (

                            <TouchableOpacity onPress={handleNext} style={{ marginLeft: 250, marginTop: 20 }}>
                                <Image
                                    source={ArrowOnboading}
                                    style={{
                                        width: moderateScale(65),
                                        height: moderateScale(65),
                                        resizeMode: "contain",
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </GradientBackground>
        </ScreenWrapper>
    );
};

export default OnboardingScreen;

// import React, { useRef, useState } from "react";
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     FlatList,
//     Dimensions,
// } from "react-native";

// import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
// import GradientBackground from "../../components/gradient/GradinetBackgorund";
// import { Colors } from "../../styles/colors";
// import styles from "./Onboarding.style";

// import {
//     Arrow,
//     GirlBg,
//     RectangleBg,
//     LoanPercentageBg,
//     RuppeBg,
// } from "../../assets/images";

// const { width } = Dimensions.get("window");

// const slides = [
//     {
//         image: GirlBg,
//         style: styles.girlImage,
//         title: "Keep Smiling and Fulfill Your\nNeeds with Quick Loans",
//     },
//     {
//         image: LoanPercentageBg,
//         style: styles.girlImage2,
//         title: "Lower your loan burden — rates\nrates starting at just 5.5% per month",
//     },
//     {
//         image: RuppeBg,
//         style: styles.girlImage3,
//         title: "Simple, secure, and\n hassle-free loan processing",
//     },
// ];



// const OnboardingScreen = ({ navigation }: any) => {
//     const flatListRef = useRef<FlatList<any>>(null);
//     const [step, setStep] = useState(0);

//     const handleNext = () => {
//         if (step < slides.length - 1) {
//             flatListRef.current?.scrollToIndex({
//                 index: step + 1,
//                 animated: true,
//             });
//         } else {
//             navigation.replace("RegistrationScreen");
//         }
//     };

//     const handleBack = () => {
//         if (step > 0) {
//             flatListRef.current?.scrollToIndex({
//                 index: step - 1,
//                 animated: true,
//             });
//         }
//     };

//     const onMomentumScrollEnd = (event: any) => {
//         const index = Math.round(
//             event.nativeEvent.contentOffset.x / width
//         );
//         setStep(index);
//     };

//     const renderItem = ({ item }: any) => (
//         <View style={{ width }}>
//             <View style={styles.imageContainer}>
//                 <Image
//                     source={RectangleBg}
//                     style={styles.whiteShape}
//                     resizeMode="contain"
//                 />

//                 <View style={styles.imageView}>
//                     <Image
//                         source={item.image}
//                         // style={styles.onboardingImage}
//                         style={slides[step].style}
//                         resizeMode="cover"
//                     />
//                 </View>
//             </View>

//             {/* <Text style={styles.title}>{item.title}</Text> */}
//         </View>
//     );

//     return (
//         <ScreenWrapper
//             backgroundColor={Colors.crimson}
//             barStyle="light-content"
//         >
//             <GradientBackground>
//                 <View style={{ flex: 1 }}>

//                     {/* Slider */}
//                     <FlatList
//                         ref={flatListRef}
//                         data={slides}
//                         renderItem={renderItem}
//                         horizontal
//                         pagingEnabled
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(_, index) => index.toString()}
//                         onMomentumScrollEnd={onMomentumScrollEnd}
//                     />

//                     {/* Dots */}
//                     <View style={styles.bottomContainer}>

//                         <Text style={styles.title}>
//                             {slides[step].title}
//                         </Text>

//                         <View style={styles.dotsContainer}>
//                             {slides.map((_, index) => (
//                                 <TouchableOpacity
//                                     key={index}
//                                     onPress={() =>
//                                         flatListRef.current?.scrollToIndex({
//                                             index,
//                                             animated: true,
//                                         })
//                                     }
//                                 >
//                                     <View
//                                         style={[
//                                             styles.dot,
//                                             {
//                                                 opacity: step === index ? 1 : 0.4,
//                                             },
//                                         ]}
//                                     />
//                                 </TouchableOpacity>
//                             ))}
//                         </View>

//                         <TouchableOpacity
//                             style={styles.nextButton}
//                             onPress={handleNext}
//                         >
//                             <Image source={Arrow} style={styles.arrowIcon} />
//                         </TouchableOpacity>

//                     </View>



//                 </View>
//             </GradientBackground>
//         </ScreenWrapper>
//     );
// };

// export default OnboardingScreen;
