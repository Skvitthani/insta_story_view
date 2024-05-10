import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Animated, {useAnimatedStyle, interpolate} from 'react-native-reanimated';
const CustomImage = ({item, x, index, size, spacer, customeImageStyle}) => {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.8, 1, 0.8],
    );
    return {
      transform: [{scale}],
    };
  });

  if (!item.url) {
    return <View style={{width: spacer}} key={index} />;
  }

  return (
    <View style={{width: size, marginBottom: 20}} key={index}>
      <Animated.View style={[styles.imageContainer, style, customeImageStyle]}>
        <Image
          source={{uri: item.url}}
          resizeMode="cover"
          style={[styles.image, {aspectRatio: 1}]}
        />
      </Animated.View>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 34,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
});
