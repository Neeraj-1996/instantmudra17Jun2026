import React, { Component } from "react"
import {StyleSheet, Dimensions} from "react-native"
import colors from "../../common"

const styles= StyleSheet.create({
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
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 16,
    marginTop: 10
  }
})

export default styles
