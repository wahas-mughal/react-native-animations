import React, {useState, FC} from 'react';
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

const PanGesture: FC = () => {
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('PAN RESPONDER ACCESS GRANTED!');
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];

  console.log(pan.getLayout());

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
          },
          pan.getLayout(),
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default PanGesture;
