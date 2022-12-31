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

const IMG_SIZE = 80;
const SPACING = 10;

export const GallerySliders: React.FC = () => {
  const [images, setImages] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const topRef = React.useRef();
  const thumbnailRef = React.useRef();

  //fetch images from pexel API
  const fetchImagesFromPexels = async () => {
    const data = await fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const {photos} = await data.json();
    return photos;
  };

  //get active index of top images
  const setActiveIndexHandler = (index: any) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    //algorithm to center the thumbnail to the screen width
    if (index * (IMG_SIZE + SPACING) - IMG_SIZE / 2 > width / 2) {
      thumbnailRef?.current?.scrollToOffset({
        offset: index * (IMG_SIZE + SPACING) - width / 2 + IMG_SIZE / 2,
        animated: true,
      });
    } else {
      thumbnailRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
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
        ref={topRef}
        data={images}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={e => {
          console.log({
            offset: e.nativeEvent.contentOffset.x,
            totalCalculation: e.nativeEvent.contentOffset.x / width,
            DefiniteValue: Math.floor(e.nativeEvent.contentOffset.x / width),
          });
          setActiveIndexHandler(
            Math.floor(e.nativeEvent.contentOffset.x / width),
          );
        }}
        showsHorizontalScrollIndicator={false}
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

      <FlatList
        ref={thumbnailRef}
        data={images}
        horizontal
        pagingEnabled
        contentContainerStyle={{paddingHorizontal: SPACING}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        style={{position: 'absolute', bottom: IMG_SIZE}}
        renderItem={({item, index}: ListRenderItemInfo<any>) => (
          <TouchableOpacity onPress={() => setActiveIndexHandler(index)}>
            <Image
              source={{uri: item.src.portrait}}
              style={{
                width: IMG_SIZE,
                height: IMG_SIZE,
                borderRadius: 12,
                marginRight: SPACING,
                borderColor: index === activeIndex ? 'orange' : 'transparent',
                borderWidth: 2,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GallerySliders;
