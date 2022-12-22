import React, {useState, FC} from 'react';
import {Text, Animated, View, TouchableOpacity} from 'react-native';

const FadeInFadeOut: FC = () => {
  const opacity = useState(new Animated.Value(0))[0];

  const fadeInHandler = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutHandler = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          opacity: opacity,
          backgroundColor: 'green',
        }}
      />

      <TouchableOpacity onPress={fadeInHandler}>
        <Text> Fade In </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fadeOutHandler}>
        <Text> Fade Out </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FadeInFadeOut;
