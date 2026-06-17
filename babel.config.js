module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowUndefined: true,
      },
    ],
    '@babel/plugin-transform-export-namespace-from',

    // ALWAYS LAST
    'react-native-reanimated/plugin',
  ],
};
