import React from 'react';
import {DiscoverData} from '../utils/DiscoverData';
import {ResponsiveGrid} from 'react-native-flexible-grid';
import {FlatList, Image, StyleSheet, View} from 'react-native';

interface DataProp {
  id: number;
  url: string;
  widthRatio?: number;
  heightRatio?: number;
}

const DiscoverScreen = () => {
  const big = [4, 12, 19];
  const long = [6, 14, 22];

  const NewDiscoverData = [];
  const DiscoverCopy = JSON.parse(JSON.stringify(DiscoverData));

  while (DiscoverCopy?.length > 0) {
    NewDiscoverData.push(
      DiscoverCopy.splice(0, 27).map((item: DataProp, index: number) => {
        if (big.includes((index + 0) % 27)) {
          return {
            ...item,
            widthRatio: 2,
            heightRatio: 2,
          };
        } else if (long.includes((index + 0) % 27)) {
          return {
            ...item,
            widthRatio: 1,
            heightRatio: 2,
          };
        } else {
          return item;
        }
      }),
    );
  }

  const renderItem = ({item}: {item: DataProp}) => {
    return (
      <View style={styles.boxContainer}>
        <Image source={{uri: item.url}} style={styles.box} resizeMode="cover" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={NewDiscoverData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <ResponsiveGrid
              data={item}
              maxItemsPerColumn={3}
              renderItem={renderItem}
              showScrollIndicator={false}
            />
          );
        }}
      />
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    flex: 1,
    margin: 4,
  },
  box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
