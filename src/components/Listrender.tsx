import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Listrender = ({
  item,
  index,
}: {
  item: {name: string; userImage: any};
  index: number;
}) => {
  return (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
      }}>
      <Image
        source={{uri: item.userImage}}
        style={{height: 42, width: 42, borderRadius: 42}}
      />
      <Text>{item.name}</Text>
    </View>
  );
};

export default Listrender;

const styles = StyleSheet.create({});
