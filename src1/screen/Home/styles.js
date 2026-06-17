import { Dimensions, StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    topView: {
        height: "42%",
        width: "100%",


    },
    helloText: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",

    },
    nametext: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
        marginTop: -70,
        marginLeft: 20  
    },
    loanCard: {
        height: 90,
        width: Dimensions.get('window').width - 70,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 20,
        padding: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginRight: 10
    },
    AppliedCard: {
        height: "100%",
        backgroundColor: "#FBE9EA",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        paddingHorizontal: 10
    },
    card: {
        width: "90%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E3E5E5",
        padding: 18,
        marginTop: 95,
         overflow: 'hidden',
    },
    field: {
        height: 32,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    cardLoanDetails: {
        height: 70,
        width: "100%",
        flexDirection: "row",
        //  backgroundColor:"red",
        marginBottom: 6

    },
    smallCard: {
        height: "100%",
        width: 50,
        marginTop: 10,

    },
    image: {
        width: 20,
        height: 20
    },
    lineImage: {
        width: 2,
        height: 37,
        marginTop: 6,
        marginLeft: 10
    },
    bigCard: {
        height: "40%",
        width: "100%",
        marginTop: 10

    },
    text: {
        fontSize: 16,
        fontWeight: "600"
    },
    smallText: {
        fontSize: 14,
        color: colors.lightGrey
    },
    fieldText:{
               fontSize: 14,
        fontWeight: "500", width: "50%"
    },
  
    line: {
        marginTop: 20,
        width: "100%",
        flexDirection: "row",

    },
    activeLoanText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "green",
        alignSelf: "center"
    },
   
    dueDateText: {
        fontSize: 16,

         alignSelf: "flex-end",
        padding: 5,
        marginHorizontal:40,
        // alignSelf:'flex-start'
        fontWeight:"bold"

    },
    dueDateText1: {
        fontSize: 16,
        // marginTop: 15,
        // alignSelf: "flex-end",
        padding: 5,
         alignSelf:'flex-start',
         marginHorizontal:40,
         fontWeight:"bold"
        },
    payingText: {
        fontWeight: "400",
        fontSize: 17,
        textAlign:"center"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      },
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
      },
      modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
      },
      modalText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
      },
      updateButton: {
        backgroundColor: "#34A853", // Google Play Store Green
        padding: 12,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
      },
      updateText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
      closeButton: {
        marginTop: 10,
        padding: 10,
      },
      closeText: {
        fontSize: 16,
        color: "gray",
      },
      
})
export default styles