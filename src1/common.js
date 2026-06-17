import { CommonActions } from '@react-navigation/native';

const colors= {
    white: "#FFFFFF",
    purple: "#7B4397",
    darkWhite: "#E3E5E5",
    black: "#3C373F",
    grey: "#E3E5E5",
    lightGrey: "#A7A7A7",
    red:"#DC2430",   
}

export const ASYNCSTORAGE_KEYS = {
  IS_LOGGEDIN: 'IS_LOGGEDIN',
  USER_ID: 'USER_ID'
}

const linearGradientColors = ['#7B4397', '#B53059', '#DC2430'];

export const resetScreen = (navigationProps, routeName, params = null) => {
  navigationProps.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        {
          name: routeName,
          params: params,
        },
      ],
    }),
  );
}

export default colors;
