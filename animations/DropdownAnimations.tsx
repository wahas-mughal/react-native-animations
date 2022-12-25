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
import React, {FC, useState, useEffect} from 'react';

const DropdownAnimations: FC = () => {
  const [iconDrop, setIconDrop] = useState(false);
  const [gender, setGender] = useState('Male');
  const dropdownIconRotate = useState(new Animated.Value(0))[0];
  const dropdownOptions = useState(new Animated.Value(0))[0];
  const dropdownOptionsOpacity = useState(new Animated.Value(0))[0];

  //rotate the icon
  const rotateIconHandler = () => {
    setIconDrop(!iconDrop);
  };

  const dropdownAnimations = () => {
    if (iconDrop) {
      Animated.timing(dropdownIconRotate, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(dropdownOptions, {
        toValue: 15,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(dropdownOptionsOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(dropdownIconRotate, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(dropdownOptions, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(dropdownOptionsOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    dropdownAnimations();
  }, [iconDrop]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Gender</Text>
      </View>
      <Pressable style={styles.dropdown} onPress={rotateIconHandler}>
        <Text> {gender} </Text>
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
      <Animated.View
        style={[
          styles.dropdownOptions,
          {
            transform: [{translateY: dropdownOptions}],
            opacity: dropdownOptionsOpacity,
          },
        ]}>
        <Pressable onPress={() => setGender('Male')}>
          <Text style={{textDecorationLine: 'underline', marginBottom: 5}}>
            Male
          </Text>
        </Pressable>
        <Pressable onPress={() => setGender('Female')}>
          <Text style={{textDecorationLine: 'underline'}}>Female</Text>
        </Pressable>
      </Animated.View>
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
    marginTop: -5,
    borderRadius: 8,
  },
});
