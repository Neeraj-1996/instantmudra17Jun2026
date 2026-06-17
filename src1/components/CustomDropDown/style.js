import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  defaultButton: {
    borderWidth: 1,
    flexDirection: 'row',
    height: 44,
    width: "100%",
    borderColor: "grey",
    borderRadius: 6,
    paddingHorizontal: 16,
    marginTop: 12
  },
  defaultText: {
    fontWeight: '500',
    fontSize: 15,
    color: 'black',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  placeHolderText: {
    color: '#D3D3D3',
  },
  defaultIcon: {
    position: 'absolute',
    right: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 10,
    width: 10,
    marginLeft: 2
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    minWidth: 100
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'red',
  },
  titleBox: {
    height: 40,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
  },
  titleText: {
    color: '#757575',
    fontSize: 14,
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 14,
  },
  buttonBox: {
    height: 50,
    // marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})