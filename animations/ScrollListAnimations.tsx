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

Array.from({length: 10}).forEach(() => {
  USERS.push(createRandomUser());
});

console.log('DATA ', USERS);

// const DATA = [...Array(30).keys()].map((_, i) => {
//   return {
//     key:faker.datatype.uuid(),
//     image: `https://randomuser.me/api/portraits/${faker.helpers.([
//       'women',
//       'men',
//     ])}/${faker.random.numeric(60)}.jpg`,
//     name: faker.internet.userName(),
//     jobTitle: faker.name.jobTitle(),
//     email: faker.internet.email(),
//   };
// });

const SPACING = 20;
const AVATAR_SIZE = 70;

const ScrollListAnimations: React.FC = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <FlatList
        data={USERS}
        renderItem={({item}: ListRenderItemInfo<ItemList>) => (
          <Image
            source={{uri: item.avatar}}
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              borderRadius: AVATAR_SIZE,
            }}
          />
        )}
        keyExtractor={(item: ItemList) => item.key.toString()}
      />
    </View>
  );
};

export default ScrollListAnimations;
