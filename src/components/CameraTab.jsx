import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const CameraTab = ({item, x, index, size, spacer, customeTextStyle}) => {
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
  if (!item.name) {
    return <View style={{width: spacer}} key={index} />;
  }
  return (
    <View
      style={{
        width: size,
        marginBottom: 40,
        alignItems: 'center',
      }}
      key={index}>
      <Animated.View style={[style]}>
        <Text style={[customeTextStyle]}>{item?.name}</Text>
      </Animated.View>
    </View>
  );
};

export default CameraTab;

const styles = StyleSheet.create({});
