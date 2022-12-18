/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Text, Animated, View, TouchableOpacity} from 'react-native';

//Notes
// getLayout is available for ValueXY only
// useNativeDriver doesn't support some properties available in JS thread like margins
// react native has two threads UI thread (main) and JS thread, originally its single thread
//useNativeDriver as much as possible to run smooth animations

const App = () => {
  // const values = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const leftValue = useState(new Animated.Value(0))[0];

  const moveBallHandler = () => {
    //animating func
    //   Animated.timing(values, {
    //     toValue: {x: 100, y: 100},
    //     duration: 1000,
    //     useNativeDriver: false,
    //   }).start();
    // };

    // right animation func
    Animated.timing(leftValue, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      for (let i = 0; i < 50000000; i++) {}
    }, 1000);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Animated.View style={values.getLayout()}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'green',
          }}
        />
      </Animated.View>
      <TouchableOpacity onPress={moveBallHandler}>
        <Text> Move me </Text>
      </TouchableOpacity> */}

      <Animated.View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          opacity: leftValue,
          backgroundColor: 'green',
        }}>
        <View />
      </Animated.View>
      <TouchableOpacity onPress={moveBallHandler}>
        <Text> Move me </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
