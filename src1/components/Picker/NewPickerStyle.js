import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
    viewContainer: {
        alignSelf: 'stretch',
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
    },
    modalViewTop: {
        flex: 1,
    },
    modalViewMiddle: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#dedede',
        zIndex: 2,
    },
    chevronContainer: {
        flexDirection: 'row',
    },
    chevron: {
        width: 15,
        height: 15,
        backgroundColor: 'transparent',
        borderColor: '#a1a1a1',
        borderTopWidth: 1.5,
        borderRightWidth: 1.5,
    },
    chevronUp: {
        marginLeft: 11,
        transform: [{ translateY: 4 }, { rotate: '-45deg' }],
    },
    chevronDown: {
        marginLeft: 22,
        transform: [{ translateY: -5 }, { rotate: '135deg' }],
    },
    chevronActive: {
        borderColor: '#007aff',
    },
    done: {
        color: '#007aff',
        fontWeight: '600',
        fontSize: 17,
        paddingTop: 1,
        paddingRight: 11,
    },
    doneDepressed: {
        fontSize: 19,
    },
    modalViewBottom: {
        justifyContent: 'center',
        backgroundColor: '#d0d4da',
    },
    placeholder: {
        color: '#c7c7cd',
    },
    headlessAndroidPicker: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'transparent',
        opacity: 0,
        width: 100,
    },
    pickerOuter: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft: 15,
      },

      // Check thse styles
      container: {
        flex: 1,
        backgroundColor: "#FFF",
      },
      innerContainer: {
        flex: 1,
        marginTop: 20,
      },
      headerTitle: {
        fontSize: 18,
        marginLeft: 16,
        marginTop: 20,
      },
      txtInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
        marginTop: 8,
        paddingLeft: 8
      },
      label: {
        color: 'black',
        fontSize: 14,
        marginTop: 22
      },
      dropDownContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
        marginTop: 8,
        width: "48%",
        height: 40,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      },
      year: {
        fontSize: 12,
        color: 'black',
        marginRight: 8,
      },
      viewContainer: {
        width: "75%",
        justifyContent: "center",
        paddingLeft: 8,
      },
      heightWeightContainer: {
        flexDirection: "row",
        marginHorizontal: 16,
      },
      genderText: {
        fontSize: 16,
        height: 40,
        width: "100%",
        color: 'black',
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        textAlign: "center",
        paddingTop: 10,
      },
      selectedCircle: {
        borderColor: 'black',
        color: 'black',
      },
      cross: {
        height: 17,
        width: 17,
      },
      bodyShapeTitle: {
        fontSize: 14,
        marginTop: 40,
        marginLeft: 16,
      },
      bodyShape: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 14,
        marginLeft: 16,
        marginTop: 8,
      },
      button: {
        width: '96%',
        height: 48,
        backgroundColor: 'black',
        borderRadius: 4,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        marginHorizontal: 10,
      },
      saveText: {
        color: "#FFF",
        fontSize: 14
      },
      weightInput: {
        width: "90%",
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        borderRadius: 4,
        padding: 8,
        fontSize: 14,
        color: 'black',
      },
      autofill:{
        fontSize: 14,
        color: 'black',
        marginLeft: 16,
        marginTop:7
      },
      renderItemContainer: {
        padding: 12,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "grey",
        marginTop: 14,
      },
      itemText: {
        fontSize: 14,
        color: 'black',
      },
      bodyShapeContainer: {
        marginTop: 10,
        alignItems: "center",
        paddingBottom:50
      },
      bodyImgOuter: {
        width: "40%"
      },
      flexRow: {
        flexDirection: "row"
      },
      plusMinus: {
        position: "absolute",
        width:15,
        height:15
      },
      img: { 
        justifyContent: "center", 
        alignItems: "center", 
        width: "30%" 
      },
      flexDirectionRow: { 
        flexDirection: "row", 
        alignItems: "flex-end" 
      },
});