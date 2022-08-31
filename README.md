# UseReducer Flipper

![screenshot of the plugin](https://i.imgur.com/blqn8oT.png)

UseReducer Logger for [Flipper](https://fbflipper.com/). It can log useReducer actions and show inside Flipper using [flipper-plugin-useReducer-debugger](https://github.com/jk-gan/flipper-plugin-useReducer-debugger).

### Support

- React Native
  - For `react-native` >= 0.62, flipper support is enabled by default
  - For `react-native` < 0.62, follow [these steps](https://fbflipper.com/docs/getting-started/react-native.html#manual-setup) to setup your app
- UseReducer 

## Get Started

1. Install [useReducer-flipper](https://github.com/ThienMD/use-reducer-flipper)  and `react-native-flipper` in your React Native app:

```bash
yarn add use-reducer-flipper react-native-flipper
# for iOS
cd ios && pod install
```

2. Add the logger into your useReducer store:

```javascript
import flipperLogger from 'use-reducer-flipper';

export const StateProvider = ({ children }) => {
  const [value, dispatch] = useReducer(__DEV__ ? flipperLogger(reducers) : reducers, initialState);

  return <StateContext.Provider value={[value, dispatch]}>{children}</StateContext.Provider>;
};
```

3. Install [flipper-plugin-redux-debugger ](https://github.com/jk-gan/flipper-plugin-useReducer-debugger) in Flipper desktop client:

```
Manage Plugins > Install Plugins > search "redux-debugger" > Install
```

4. Start your app, then you should be able to see Redux Debugger on your Flipper app
