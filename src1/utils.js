import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
// export const BASE_URL = 'https://instantmudra.com/admin/'

// export const API_BASE_URL = BASE_URL+'API/'

// export const ERROR_MESSAGE = 'We are facing some techical issue. Team is looking into it.'

// export const dropDownArrFromObj = (ob) => {
//     let newArr = [];
//     let objKey = Object.keys(ob);
//     objKey.map(item => {
//         let obj = {
//           id: item,
//           title: ob[item]
//         }
//         newArr.push(obj)
//     });
//     return newArr;
// }


export const BASE_URL = 'https://instantmudra.com/admin/'

export const API_BASE_URL = BASE_URL+'API/'

export const ERROR_MESSAGE = 'We are facing some techical issue. Team is looking into it.'

export const dropDownArrFromObj = (ob) => {
    let newArr = [];
    let objKey = Object.keys(ob);
    objKey.map(item => {
        let obj = {
          id: item,
          title: ob[item]
        }
        newArr.push(obj)
    });
    return newArr;
}




export const useScreenDimensions = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    // Function to handle screen dimension changes
    const handleScreenSizeChange = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    // Subscribe to dimension changes
    const subscription = Dimensions.addEventListener('change', handleScreenSizeChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      // Use remove() on the subscription
      subscription.remove();
    };
  }, []);

  return { screenWidth, screenHeight };
};


