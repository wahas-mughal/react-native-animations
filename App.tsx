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

const App = () => {
  const values = useState(new Animated.ValueXY({x: 0, y: 0}))[0];

  const moveBallHandler = () => {
    Animated.timing(values, {
      toValue: {x: 100, y: 100},
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Animated.View style={values.getLayout()}>
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
      </TouchableOpacity>
    </View>
  );
};

export default App;
