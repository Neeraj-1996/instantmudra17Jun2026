import { StyleSheet } from "react-native";
const threeStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
cardWrapper: {
  marginTop: 16,
  borderRadius: 8,
  backgroundColor: '#f9f9f9',
  borderColor: '#ddd',
  borderWidth: 1,
  overflow: 'hidden', // ensures full-height line renders correctly
},
cardRow: {
  flexDirection: 'row',
  width: '100%',
},
statusLineWrapper: {
  width: 5,
  backgroundColor: 'transparent',
},

statusIndicator: {
  width: 5,
  height:50,
  flex:1,
  // height: '100%',
  borderRadius: 0,
},
cardContentWrapper: {
  flex: 1,
},
cardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 12,
},
cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  dateText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 4,
  },
footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
  rowText: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 4,
},
labelTextFooter: {
  fontSize: 16,
  fontWeight: '500',
  color: '#333',
},
labelText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
},

valueText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
},
    statusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
cardFooterWrapper: {
  backgroundColor: '#fff',
  borderRadius: 12,
  elevation: 4, // for Android shadow
  shadowColor: '#000', // for iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginTop: 20,
  marginHorizontal: 16,
},
});

export default threeStyles;