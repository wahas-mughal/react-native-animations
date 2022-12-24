import React, {useState, FC} from 'react';
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

const PanGestureTransform: FC = () => {
  const pan = useState(new Animated.ValueXY())[0];

  //   const panResponder = useState(
  //     PanResponder.create({
  //       onMoveShouldSetPanResponder: () => true,
  //       onPanResponderGrant: () => {
  //         console.log('PAN RESPONDER ACCESS GRANTED!');
  //         pan.setOffset({
  //           x: pan.x._value,
  //           y: pan.y._value,
  //         });
  //       },
  //       onPanResponderMove: (e, gestureState) => {
  //         pan.x.setValue(gestureState.dx), pan.y.setValue(gestureState.dy);
  //       },
  //       onPanResponderRelease: () => {
  //         pan.flattenOffset();
  //       },
  //     }),
  //   )[0];

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
      onPanResponderMove: (e, gestureState) => {
        pan.x.setValue(gestureState.dx), pan.y.setValue(gestureState.dy);
      },
      onPanResponderRelease: () => {
        // pan.flattenOffset();
      },
    }),
  )[0];

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
            transform: [
              {
                translateX: pan.x,
              },
              {
                translateY: pan.y,
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      />

      {/* <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
            top: pan.y,
            left: pan.x,
          },
        ]}
        {...panResponder.panHandlers}
      /> */}
    </View>
  );
};

export default PanGestureTransform;
