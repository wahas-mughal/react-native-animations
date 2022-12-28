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
  ListRenderItemInfo,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
import {API_KEY} from '../assets/const';
const {width, height} = Dimensions.get('screen');

const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';

export const GallerySliders: React.FC = () => {
  const [images, setImages] = React.useState(null);

  const fetchImagesFromPexels = async () => {
    const data = await fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const {photos} = await data.json();
    return photos;
  };

  React.useEffect(() => {
    const fetchImagesHandler = async () => {
      const images = await fetchImagesFromPexels();
      setImages(images);
      console.log('IMAGES ', images);
    };
    fetchImagesHandler();
  }, []);

  if (!images) {
    return <Text> Loading...</Text>;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}: ListRenderItemInfo<any>) => (
          <View style={{width, height}}>
            <Image
              source={{uri: item.src.portrait}}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        )}
      />
    </View>
  );
};

export default GallerySliders;
