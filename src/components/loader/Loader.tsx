import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
} from 'react-native';

import styles from './Loader.styles';
import { Colors } from '../../styles/colors';

interface LoaderProps {
    showLoader: boolean;
    progress?: number;
}

const Loader: React.FC<LoaderProps> = ({
    showLoader,
    progress,
}) => {

    if (!showLoader) return null;

    return (
        <View style={styles.container}>
            <View style={styles.middleView}>

                <ActivityIndicator size="large" color={Colors.crimson} />

                {/* Show only if progress available */}
                {progress !== undefined && (
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 16,
                            fontWeight: '600',
                        }}
                    >
                        {progress}%
                    </Text>
                )}

            </View>
        </View>
    );
};

export default Loader;