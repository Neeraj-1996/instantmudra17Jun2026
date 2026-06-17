import { StyleSheet, Dimensions } from 'react-native';
// import colors from '../../common'; // keep if you need it

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleView: {
        height: 120,
        width: 120,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default styles;