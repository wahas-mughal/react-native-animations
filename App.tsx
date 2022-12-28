import React, {useState, FC} from 'react';
import {Text, Animated, View, TouchableOpacity} from 'react-native';
import DropdownAnimations from './animations/DropdownAnimations';
import FadeInFadeOut from './animations/FadeInFadeOut';
import GallerySliders from './animations/GallerySlides';
import PanResponder from './animations/PanResponder';
import PanResponderTransform from './animations/PanResponderTransform';
import ScrollListAnimations from './animations/ScrollListAnimations';

//Notes
// getLayout is available for ValueXY only
// useNativeDriver doesn't support some properties available in JS thread like margins, we use tranform property
// for this purpose
// react native has two threads UI thread (main) and JS thread, originally its single thread
//useNativeDriver as much as possible to run smooth animations

const App: FC = () => {
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
      toValue: 300,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      for (let i = 0; i < 50000000; i++) {}
    }, 1000);
  };

  return (
    <View style={{flex: 1}}>
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
      {/* 
      <Animated.View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          opacity: leftValue,
          backgroundColor: 'green',
        }}
      /> */}

      {/* <Animated.View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          transform: [{translateX: leftValue}],
          backgroundColor: 'green',
        }}
      />

      <TouchableOpacity onPress={moveBallHandler}>
        <Text> Move me </Text>
      </TouchableOpacity> */}

      {/* <FadeInFadeOut /> */}
      {/* <PanResponder /> */}
      {/* <PanResponderTransform /> */}
      {/* <DropdownAnimations /> */}
      {/* <ScrollListAnimations /> */}
      <GallerySliders />
    </View>
  );
};

export default App;
