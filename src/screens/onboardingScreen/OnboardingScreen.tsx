import React, { useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";

import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import GradientBackground from "../../components/gradient/GradinetBackgorund";
import { Colors } from "../../styles/colors";
import styles from "./Onboarding.style";

import {
    Arrow,
    GirlBg,
    RectangleBg,
    LoanPercentageBg,
    RuppeBg,
} from "../../assets/images";

const { width } = Dimensions.get("window");

const slides = [
    {
        image: GirlBg,
        style: styles.girlImage,
        title: "Keep Smiling and Fulfill Your\nNeeds with Quick Loans",
    },
    {
        image: LoanPercentageBg,
        style: styles.girlImage2,
        title: "Lower your loan burden — rates\nrates starting at just 5.5% per month",
    },
    {
        image: RuppeBg,
        style: styles.girlImage3,
        title: "Simple, secure, and\n hassle-free loan processing",
    },
];



const OnboardingScreen = ({ navigation }: any) => {
    const flatListRef = useRef<FlatList<any>>(null);
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

    const handleBack = () => {
        if (step > 0) {
            flatListRef.current?.scrollToIndex({
                index: step - 1,
                animated: true,
            });
        }
    };

    const onMomentumScrollEnd = (event: any) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / width
        );
        setStep(index);
    };

    const renderItem = ({ item }: any) => (
        <View style={{ width }}>
            <View style={styles.imageContainer}>
                <Image
                    source={RectangleBg}
                    style={styles.whiteShape}
                    resizeMode="contain"
                />

                <View style={styles.imageView}>
                    <Image
                        source={item.image}
                        // style={styles.onboardingImage}
                        style={slides[step].style}
                        resizeMode="cover"
                    />
                </View>
            </View>

            {/* <Text style={styles.title}>{item.title}</Text> */}
        </View>
    );

    return (
        <ScreenWrapper
            backgroundColor={Colors.crimson}
            barStyle="light-content"
        >
            <GradientBackground>
                <View style={{ flex: 1 }}>

                    {/* Slider */}
                    <FlatList
                        ref={flatListRef}
                        data={slides}
                        renderItem={renderItem}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onMomentumScrollEnd={onMomentumScrollEnd}
                    />

                    {/* Dots */}
                    <View style={styles.bottomContainer}>

                        <Text style={styles.title}>
                            {slides[step].title}
                        </Text>

                        <View style={styles.dotsContainer}>
                            {slides.map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        flatListRef.current?.scrollToIndex({
                                            index,
                                            animated: true,
                                        })
                                    }
                                >
                                    <View
                                        style={[
                                            styles.dot,
                                            {
                                                opacity: step === index ? 1 : 0.4,
                                            },
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleNext}
                        >
                            <Image source={Arrow} style={styles.arrowIcon} />
                        </TouchableOpacity>

                    </View>

                    {/* <View style={styles.dotsContainer}>
                        {slides.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    flatListRef.current?.scrollToIndex({
                                        index,
                                        animated: true,
                                    })
                                }
                            >
                                <View
                                    style={[
                                        styles.dot,
                                        {
                                            opacity: step === index ? 1 : 0.4,
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

               
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleNext}
                    >
                        <Image
                            source={Arrow}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity> */}
                    {/* <View
                        style={{
                            alignItems: "center",
                            marginBottom: 200,
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleNext}
                            style={styles.nextButton}
                        >
                            <Image
                                source={Arrow}
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>
                    </View> */}
                    {/* <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 30,
                            marginBottom: 50,
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleBack}
                            disabled={step === 0}
                            style={[
                                styles.nextButton,
                                { opacity: step === 0 ? 0.3 : 1 },
                            ]}
                        >
                            <Image
                                source={Arrow}
                                style={[
                                    styles.arrowIcon,
                                    {
                                        transform: [{ scaleX: -1 }],
                                    },
                                ]}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleNext}
                            style={styles.nextButton}
                        >
                            <Image
                                source={Arrow}
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>
                    </View> */}

                </View>
            </GradientBackground>
        </ScreenWrapper>
    );
};

export default OnboardingScreen;
// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
// import GradientBackground from "../../components/gradient/GradinetBackgorund";
// import { Colors } from "../../styles/colors";
// import styles from "./Onboarding.style";

// import {
//     Arrow,
//     GirlBg,
//     RectangleBg,
//     LoanPercentageBg,
//     RuppeBg
// } from "../../assets/images";

// const slides = [
//     {
//         image: GirlBg,
//         style: styles.girlImage,
//         title: "Keep Smiling and Fulfill Your\nNeeds with Quick Loans",
//     },
//     {
//         image: LoanPercentageBg,
//         style: styles.girlImage2,
//         title: "Helps you cover not only the\nexpenses towards your course fees",
//     },
//     {
//         image: RuppeBg,
//         style: styles.girlImage3,
//         title: "Apply Smart, Get Approved Faster\nWithout the Hassle",
//     },
// ];

// const OnboardingScreen = ({ navigation }: any) => {

//     const [step, setStep] = useState(0);

//     const handleNext = () => {

//         if (step < slides.length - 1) {
//             setStep(step + 1);
//         } else {
//             navigation.replace("RegistrationScreen");
//         }

//     };

//     return (
//         <ScreenWrapper backgroundColor={Colors.crimson} barStyle="light-content">
//             <GradientBackground>

//                 <View style={styles.container}>

//                     {/* IMAGE SECTION */}
//                     <View style={styles.imageContainer}>
//                         <Image
//                             source={RectangleBg}
//                             style={styles.whiteShape}
//                             resizeMode="contain"
//                         />

//                         <View style={styles.imageView}>
//                             <Image
//                                 source={slides[step].image}
//                                 style={styles.onboardingImage}
//                                 resizeMode="cover"
//                             />
//                         </View>
//                     </View>


//                     {/* BOTTOM SECTION */}
//                     <View style={styles.bottomContainer}>

//                         {/* DOTS */}
//                         <View style={styles.dotsContainer}>
//                             {slides.map((_, index) => (
//                                 <View
//                                     key={index}
//                                     style={[
//                                         styles.dot,
//                                         { opacity: step === index ? 1 : 0.4 }
//                                     ]}
//                                 />
//                             ))}
//                         </View>

//                         {/* TITLE */}
//                         <Text style={styles.title}>
//                             {slides[step].title}
//                         </Text>

//                         {/* NEXT BUTTON */}
//                         <TouchableOpacity
//                             style={styles.nextButton}
//                             onPress={handleNext}
//                         >
//                             <Image
//                                 source={Arrow}
//                                 style={styles.arrowIcon}
//                             />
//                         </TouchableOpacity>

//                     </View>

//                 </View>

//             </GradientBackground>
//         </ScreenWrapper>
//     );
// };

// export default OnboardingScreen;