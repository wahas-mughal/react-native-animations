import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import React, {FC, useState} from 'react';

const DropdownAnimations: FC = () => {
  const dropdownIconRotate = useState(new Animated.Value(0))[0];
  const dropdownOptions = useState(new Animated.Value(0))[0];

  //rotate the icon
  const rotateIconHandler = () => {
    console.log('pressed');
    Animated.timing(dropdownIconRotate, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Gender</Text>
      </View>
      <Pressable style={styles.dropdown} onPress={rotateIconHandler}>
        <Text> Male</Text>
        <Animated.Image
          source={require('../assets/icons/left-arrow.png')}
          style={{
            width: 15,
            height: 15,
            transform: [
              {
                rotate: dropdownIconRotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-90deg'],
                }),
              },
            ],
          }}
        />
      </Pressable>
      <View style={styles.dropdownOptions}>
        <Pressable>
          <Text style={{textDecorationLine: 'underline', marginBottom: 5}}>
            Male
          </Text>
        </Pressable>
        <Pressable>
          <Text style={{textDecorationLine: 'underline'}}>Female</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DropdownAnimations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 20,
  },
  dropdown: {
    width: '70%',
    height: '5%',
    paddingHorizontal: 15,
    borderColor: '#777',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 8,
  },
  dropdownOptions: {
    width: '70%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#777',
    borderWidth: 1,
    marginTop: 12,
    borderRadius: 8,
  },
});
