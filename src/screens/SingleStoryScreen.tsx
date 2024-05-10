import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SingleStoryData} from '../utils/SingleStoryData';
import FooterComponents from '../components/FooterComponents';
import {StoryContainer, StoryRef} from 'react-native-story-view';
import {RootStackParamList} from '../navigation/SatckNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const deviceHeight = Dimensions.get('window').height;
type SingleStoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SingleStoryScreen'
>;
const SingleStoryScreen = () => {
  const storyList = useRef<StoryRef>(null);
  const navigation = useNavigation<SingleStoryScreenNavigationProp>();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isProgressIndex, setIsProgressIndex] = useState(0);

  const ProfileHeader = () => {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileSubContainer}>
          <Image
            source={{uri: SingleStoryData[0]?.profile ?? ''}}
            style={styles.profileImageStyle}
          />
          <Text style={styles.profileNameText}>
            {SingleStoryData[0]?.username}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StoryContainer
        storyIndex={9}
        ref={storyList}
        visible={true}
        extended={true}
        progressIndex={isProgressIndex}
        maxVideoDuration={10}
        onComplete={() => {
          navigation.goBack();
        }}
        enableProgress={!showBottomSheet}
        stories={SingleStoryData[0]?.stories}
        imageStyle={styles.storyImageStyle}
        renderCustomView={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.cancleImageView}>
              <Image
                source={require('../assets/cancel.png')}
                style={styles.cancleImageStyle}
              />
            </View>
          </TouchableOpacity>
        )}
        renderFooterComponent={({progressIndex}) => {
          return (
            <FooterComponents
              setIsProgressIndex={setIsProgressIndex}
              progrssIndex={progressIndex}
              showBottomSheet={showBottomSheet}
              setShowBottomSheet={setShowBottomSheet}
            />
          );
        }}
        renderHeaderComponent={({}) => {
          return <ProfileHeader />;
        }}
        barStyle={{
          barHeight: 4,
          barActiveColor: '#FFFFFF',
          barInActiveColor: '#888888',
        }}
      />
    </View>
  );
};

export default SingleStoryScreen;

const styles = StyleSheet.create({
  cancleImageView: {
    top: 40,
    right: 15,
    position: 'absolute',
  },
  cancleImageStyle: {
    height: 25,
    width: 25,
    tintColor: 'white',
  },
  profileNameText: {
    color: '#fff',
    fontSize: 20,
  },
  profileContainer: {
    paddingLeft: 15,
    paddingTop: deviceHeight * 0.03,
  },
  profileSubContainer: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  storyImageStyle: {
    borderRadius: 16,
    resizeMode: 'cover',
    height: deviceHeight * 0.82,
  },
  profileImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
