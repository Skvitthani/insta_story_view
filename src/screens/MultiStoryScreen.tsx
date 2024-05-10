import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {userStories} from '../utils/StoryData';
import {useNavigation} from '@react-navigation/native';
import MultiStoryFooter from '../components/MultiStoryFooter';
import {RootStackParamList} from '../navigation/SatckNavigation';
import {MultiStory, MultiStoryRef} from 'react-native-story-view';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const deviceHeight = Dimensions.get('window').height;

type MultiStoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MultiStoryScreen'
>;

const MultiStoryScreen = () => {
  const navigation = useNavigation<MultiStoryScreenNavigationProp>();
  const multiStoryRef = useRef<MultiStoryRef>(null);

  return (
    <View style={styles.container}>
      <MultiStory
        ListHeaderComponent={() => {
          return (
            <TouchableOpacity
              style={styles.currentUserContainer}
              onPress={() => navigation.navigate('SingleStoryScreen')}>
              <Image
                source={{
                  uri: 'https://sosugary.com/wp-content/uploads/2022/01/TheWeeknd_001.jpg',
                }}
                style={styles.currentUserProfile}
              />
              <Text>Current</Text>
            </TouchableOpacity>
          );
        }}
        stories={userStories}
        ref={multiStoryRef}
        avatarProps={{
          userNameStyle: styles.userNameText,
        }}
        storyContainerProps={{
          backgroundColor: '#000',
          imageStyle: styles.storyImageStyle,
          renderFooterComponent: () => {
            return <MultiStoryFooter />;
          },
          barStyle: {
            barHeight: 4,
            barActiveColor: '#FFFFFF',
            barInActiveColor: '#888888',
          },
        }}
      />
      {/* <MultiStoryContainer
        isShowReply
        maxVideoDuration={10}
        progressIndex={5}
        viewedStories={[]}
        stories={SingleStoryData}
        visible={showCurrentUserStroy}
        enableProgress={true}
        renderFooterComponent={({progressIndex}) => {
          return <FooterComponents progrssIndex={progressIndex} />;
        }}
        onComplete={() => setShowCurrentUserStory(false)}
      /> */}
    </View>
  );
};

export default MultiStoryScreen;

const styles = StyleSheet.create({
  userNameText: {
    fontSize: 16,
    color: 'black',
  },
  currentUserContainer: {
    gap: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  container: {
    marginTop: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: deviceHeight * 0.025,
  },
  likeIcon: {
    height: deviceHeight * 0.052,
    width: deviceHeight * 0.052,
  },
  inputText: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    borderRadius: 54,
    backgroundColor: '#fff',
  },
  reactionIcon: {
    height: deviceHeight * 0.052,
    width: deviceHeight * 0.052,
  },
  contentConatinerStyle: {
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  storyImageStyle: {
    borderRadius: 16,
    resizeMode: 'cover',
    height: deviceHeight * 0.82,
  },
  currentUserProfile: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
