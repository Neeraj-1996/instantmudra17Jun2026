import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from "react-native";
import { Colors } from "../../styles/colors";
import { moderateScale } from "../../styles/responsive";
import { FontSize } from "../../styles/fonts";
interface CaptchaProps {
    onValueChange?: (
        value: string,
        captcha: string,
        isValid: boolean
    ) => void;
    length?: number;
}

interface CharStyle {
    color: string;
    rotate: string;
    top: number;
    fontSize: number;
}

const CAPTCHA_CHARS =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // removed confusing chars

const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const generateNoiseLines = () => {
    return Array.from({ length: 4 }, (_, index) => ({
        id: index,
        rotate: `${random(-25, 25)}deg`,
        top: random(5, 35),
        left: random(0, 80),
        width: random(50, 120),
        backgroundColor: `hsla(${random(0, 360)}, 90%, 50%, 0.35)`,
    }));
};

const Captcha: React.FC<CaptchaProps> = ({
    onValueChange,
    length = 6,
}) => {
    const [captcha, setCaptcha] = useState("");
    const [input, setInput] = useState("");
    const [charStyles, setCharStyles] = useState<CharStyle[]>([]);
    const [noiseLines, setNoiseLines] = useState<any[]>([]);

    const isValid = useMemo(
        () => input.trim().toUpperCase() === captcha,
        [input, captcha]
    );

    const createCaptcha = useCallback(() => {
        let text = "";
        const styles: CharStyle[] = [];

        for (let i = 0; i < length; i++) {
            const char =
                CAPTCHA_CHARS[
                Math.floor(Math.random() * CAPTCHA_CHARS.length)
                ];

            text += char;

            styles.push({
                color: `hsl(${random(0, 360)}, 85%, 45%)`,
                rotate: `${random(-20, 20)}deg`,
                top: random(-5, 5),
                fontSize: random(24, 32),
            });
        }

        setCaptcha(text);
        setCharStyles(styles);
        setNoiseLines(generateNoiseLines());
        setInput("");
    }, [length]);

    // const createCaptcha = useCallback(() => {
    //     let text = "";
    //     const styles: CharStyle[] = [];

    //     for (let i = 0; i < length; i++) {
    //         const char =
    //             CAPTCHA_CHARS[
    //             Math.floor(Math.random() * CAPTCHA_CHARS.length)
    //             ];

    //         text += char;

    //         styles.push({
    //             color: `hsl(${random(0, 360)}, 85%, 45%)`,
    //             rotate: `${random(-20, 20)}deg`,
    //             top: random(-5, 5),
    //             fontSize: random(24, 32),
    //         });
    //     }

    //     setCaptcha(text);
    //     setCharStyles(styles);
    //     setNoiseLines(generateNoiseLines());
    //     setInput("");

    //     onValueChange?.("", text, false);
    // }, [length, onValueChange]);

    useEffect(() => {
        createCaptcha();
    }, [createCaptcha]);

    const handleInput = (value: string) => {
        const formatted = value.toUpperCase();

        setInput(formatted);

        onValueChange?.(
            formatted,
            captcha,
            formatted === captcha
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                {/* CAPTCHA BOX */}
                <View style={styles.captchaBox}>
                    {/* Noise Lines */}
                    {noiseLines.map((line) => (
                        <View
                            key={line.id}
                            style={[
                                styles.noiseLine,
                                {
                                    width: line.width,
                                    top: line.top,
                                    left: line.left,
                                    backgroundColor:
                                        line.backgroundColor,
                                    transform: [
                                        {
                                            rotate: line.rotate,
                                        },
                                    ],
                                },
                            ]}
                        />
                    ))}

                    {/* Random Dots */}
                    {Array.from({ length: 18 }).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    top: random(0, 40),
                                    left: random(0, 180),
                                    backgroundColor: `hsla(${random(
                                        0,
                                        360
                                    )}, 90%, 50%, 0.5)`,
                                },
                            ]}
                        />
                    ))}

                    {/* Characters */}
                    <View style={styles.captchaRow}>
                        {captcha.split("").map((char, index) => (
                            <Text
                                key={`${char}-${index}`}
                                style={[
                                    styles.charStyle,
                                    {
                                        color:
                                            charStyles[index]?.color,
                                        fontSize:
                                            charStyles[index]
                                                ?.fontSize,
                                        top:
                                            charStyles[index]?.top,
                                        transform: [
                                            {
                                                rotate:
                                                    charStyles[index]
                                                        ?.rotate,
                                            },
                                        ],
                                    },
                                ]}
                            >
                                {char}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* REFRESH BUTTON */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={createCaptcha}
                    style={styles.refreshButton}
                >
                    <Text style={styles.refreshIcon}>↻</Text>
                    {/* <Text style={styles.refreshText}>
                        Refresh
                    </Text> */}
                </TouchableOpacity>
            </View>

            {/* INPUT */}
            <TextInput
                placeholder="Enter CAPTCHA"
                placeholderTextColor="#8B8B8B"
                autoCapitalize="characters"
                value={input}
                maxLength={length}
                onChangeText={handleInput}
                style={[
                    styles.input,
                    input.length > 0 &&
                    (isValid
                        ? styles.validInput
                        : styles.invalidInput),
                ]}
            />

            {/* STATUS */}
            {input.length > 0 && (
                <Text
                    style={[
                        styles.statusText,
                        {
                            color: isValid
                                ? "#1E9E52"
                                : "#E53935",
                        },
                    ]}
                >
                    {isValid
                        ? "✓ CAPTCHA Verified"
                        : "✗ CAPTCHA Not Matched"}
                </Text>
            )}
        </View>
    );
};

export default Captcha;

interface Style {
    container: ViewStyle;
    topRow: ViewStyle;
    captchaBox: ViewStyle;
    captchaRow: ViewStyle;
    charStyle: TextStyle;
    input: TextStyle;
    refreshButton: ViewStyle;
    refreshText: TextStyle;
    refreshIcon: TextStyle;
    noiseLine: ViewStyle;
    dot: ViewStyle;
    statusText: TextStyle;
    validInput: ViewStyle;
    invalidInput: ViewStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        width: "100%",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: moderateScale(15),
    },

    captchaBox: {
        width: "68%",
        height: moderateScale(50),
        borderWidth: moderateScale(1),
        borderColor: "#DADADA",
        borderRadius: moderateScale(14),
        backgroundColor: "#F7F9FC",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
    },

    captchaRow: {
        flexDirection: "row",
        zIndex: 10,
    },

    charStyle: {
        fontWeight: "900",
        marginHorizontal: 3,
        textShadowColor: "rgba(0,0,0,0.25)",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 2,
    },

    refreshButton: {
        width: "28%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(12),
        backgroundColor: Colors.white,
    },

    refreshIcon: {
        fontSize: moderateScale(22),
        color: "#4B6BFB",
        fontWeight: "700",
    },

    refreshText: {
        marginTop: moderateScale(2),
        color: "#4B6BFB",
        fontSize: moderateScale(13),
        fontWeight: "700",
    },

    input: {
        height: moderateScale(50),
        borderWidth: moderateScale(1.2),
        borderColor: "#D5D5D5",
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(14),
        fontSize: moderateScale(16),
        marginTop: moderateScale(14),
        backgroundColor: "#FFFFFF",
        color: "#000",
        fontWeight: "600",
        letterSpacing: moderateScale(2),
    },

    validInput: {
        borderColor: "#22C55E",
    },

    invalidInput: {
        borderColor: "#EF4444",
    },

    statusText: {
        marginTop: moderateScale(8),
        fontSize: FontSize.FONT_12,
        fontWeight: "700",
    },

    noiseLine: {
        position: "absolute",
        height: moderateScale(2),
        borderRadius: moderateScale(10),
    },

    dot: {
        position: "absolute",
        width: moderateScale(5),
        height: moderateScale(5),
        borderRadius: moderateScale(10),
    },
});