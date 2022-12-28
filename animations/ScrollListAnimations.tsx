// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/

import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  ListRenderItemInfo,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {faker} from '@faker-js/faker';
import {ItemList} from './types';

faker.seed(10);

let USERS: any = [];

const createRandomUser: any = () => {
  return {
    key: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    name: faker.internet.userName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
};

Array.from({length: 20}).forEach(() => {
  USERS.push(createRandomUser());
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG =
  'https://images.pexels.com/photos/14578996/pexels-photo-14578996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const ScrollListAnimations: React.FC = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        data={USERS}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}: ListRenderItemInfo<ItemList>) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                transform: [{scale}],
                opacity,
              }}>
              <Image
                source={{uri: item.avatar}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View style={{width: '80%'}}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>
                  {item.email}{' '}
                </Text>
              </View>
            </Animated.View>
          );
        }}
        keyExtractor={(item: ItemList) => item.key.toString()}
      />
    </View>
  );
};

export default ScrollListAnimations;
