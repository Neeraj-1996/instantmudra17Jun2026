import React, { useState } from "react";
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import Accordion from "react-native-collapsible/Accordion";
import Header from "../../../components/header/Header";
import styles from './style'
import { SafeAreaView } from "react-native-safe-area-context";
const CONTENT = [
    {
        title: "What is Instant Mudra?",
        content:
            "Instant Mudra is a brand of Chintamani Finlease Ltd that provides loans to fulfill your needs.",
    },
    {
        title: "Which banks/NBFC you partnered with?",
        content:
            "We partnered with Chintamani Finlease Limited, registered with RBI.",
    },
    {
        title: "Do I have to pay interest?",
        content:
            "Yes, interest is based on market rates and your credit profile.",
    },
    {
        title: "Are there hidden charges?",
        content:
            "No hidden charges. Only processing fee up to 5% + GST.",
    },
    {
        title: "How do I pay EMI?",
        content:
            "Through e-NACH / auto debit from your account.",
    },
];

const Faq = ({ navigation }: any) => {
    const [activeSections, setActiveSections] = useState<number[]>([]);

    const renderHeader = (section: any, index: number, isActive: boolean) => (
        <View style={[styles.card, isActive && styles.activeCard]}>
            <Text style={styles.question}>{section.title}</Text>

            <Text style={styles.icon}>
                {isActive ? "▲" : "▼"}
            </Text>
        </View>
    );

    const renderContent = (section: any) => (
        <View style={styles.answerBox}>
            <Text style={styles.answer}>{section.content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} title="FAQ" />

            <ScrollView contentContainerStyle={styles.container}>
                <Accordion
                    sections={CONTENT}
                    activeSections={activeSections}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={(sections) => setActiveSections(sections)}
                    touchableComponent={TouchableOpacity}
                    duration={300}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Faq;