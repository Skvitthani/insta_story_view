import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Listrender from './Listrender';
import Modal from 'react-native-modal';
import React, {useEffect} from 'react';
import CustomImage from './CustomImage';
import {UserData} from '../utils/UserData';
import {SingleStoryData} from '../utils/SingleStoryData';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView';

const deviceHeight = Dimensions.get('window').height;

interface props {
  progrssIndex: number;
  showBottomSheet: boolean;
  setIsProgressIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const FooterComponents = (props: props) => {
  const {
    progrssIndex,
    showBottomSheet,
    setShowBottomSheet,
    setIsProgressIndex,
  } = props;

  const ListHeaderComponent = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => setShowBottomSheet(false)}
          style={styles.headerContainer}
        />
        <View style={styles.headerInnerView}>
          <Image
            source={require('../assets/view.png')}
            style={[styles.upArrow, {tintColor: '#000'}]}
          />
          <Text style={[styles.viewCountTextStyle, {color: '#000'}]}>
            6 Viewers
          </Text>
        </View>
      </View>
    );
  };

  const scrollViewRef = useAnimatedRef<AnimatedScrollView>();
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: e => {
      offSet.value = e.contentOffset.x;
    },
  });
  const {width} = useWindowDimensions();

  const SIZE = width * 0.2;
  const SPACER = (width - SIZE) / 2;

  const NewData = SingleStoryData.map(userStory => {
    return {
      ...userStory,
      stories: [{}, ...userStory.stories, {}],
    };
  })[0]?.stories;

  useEffect(() => {
    setTimeout(() => {
      const index = progrssIndex + 2;
      const _offSet = index * SIZE - SPACER;
      scrollViewRef.current?.scrollTo({x: _offSet, y: 0, animated: true});
    }, 500);
  }, [showBottomSheet, progrssIndex]);

  return (
    <View>
      {showBottomSheet ? (
        <Modal
          backdropOpacity={0.5}
          isVisible={showBottomSheet}
          style={{margin: 0}}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.2)', flex: 1}}>
            <Animated.ScrollView
              contentContainerStyle={{
                alignItems: 'flex-end',
              }}
              ref={scrollViewRef}
              onScrollEndDrag={() => {
                const currentIndex = Math.round(x.value / SIZE);
                setIsProgressIndex(currentIndex);
              }}
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={SIZE}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}>
              {NewData?.map((item, index) => {
                return (
                  <CustomImage
                    key={index}
                    index={index}
                    item={item}
                    x={x}
                    size={SIZE}
                    spacer={SPACER}
                    customeImageStyle={{
                      borderWidth: progrssIndex + 1 == index ? 5 : 0,
                      borderColor:
                        progrssIndex + 1 == index ? 'white' : 'transparent',
                    }}
                  />
                );
              })}
            </Animated.ScrollView>
            <View
              key={`${Math.round(Math.random() * 10)}cc:`}
              style={styles.bottomSheetContainer}>
              <FlatList
                data={UserData}
                renderItem={({item, index}) => {
                  return <Listrender index={index} item={item} />;
                }}
                ListHeaderComponent={ListHeaderComponent}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>
      ) : (
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => setShowBottomSheet(true)}>
          <Image
            source={require('../assets/view.png')}
            style={styles.upArrow}
          />
          <Text style={styles.viewCountTextStyle}>0 View</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FooterComponents;

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  upArrow: {
    width: 24,
    height: 24,
  },
  viewCountTextStyle: {
    color: '#fff',
  },
  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    maxHeight: deviceHeight * 0.54,
  },
  headerContainer: {
    height: 4,
    width: 30,
    backgroundColor: '#020609',
    marginTop: 10,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 15,
  },
  headerInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
