import {
  View,
  Image,
  FlatList,
  Keyboard,
  Platform,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
const deviceHeight = Dimensions.get('window').height;

const MultiStoryFooter = () => {
  const ReactionData = [
    {icon: require('../assets/like1.png')},
    {icon: require('../assets/love.png')},
    {icon: require('../assets/haha.png')},
    {icon: require('../assets/care.png')},
    {icon: require('../assets/sad.png')},
    {icon: require('../assets/angry.png')},
  ];

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const inpuyt = useRef(null);

  useEffect(() => {
    const keyboardDidShowSubscription = Keyboard.addListener(
      Platform.OS == 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideSubscription = Keyboard.addListener(
      Platform.OS == 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );
    return () => {
      keyboardDidShowSubscription.remove();
      keyboardDidHideSubscription.remove();
    };
  }, []);

  const renderItem = ({item}: {item: {icon: ImageSourcePropType}}) => {
    return (
      <TouchableOpacity style={{margin: 10}} onPress={() => {}}>
        <Image source={item.icon} style={styles.reactionIcon} />
      </TouchableOpacity>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {isKeyboardOpen && (
        <FlatList
          numColumns={3}
          data={ReactionData}
          renderItem={renderItem}
          style={{marginBottom: 120}}
          contentContainerStyle={styles.contentConatinerStyle}
        />
      )}
      <View style={styles.bottomContainer}>
        <TextInput
          ref={inpuyt}
          style={styles.inputText}
          placeholder="Send message"
          placeholderTextColor={'#777A80'}
        />
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.likeIcon}
            source={require('../assets/like.png')}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MultiStoryFooter;

const styles = StyleSheet.create({
  reactionIcon: {
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
  contentConatinerStyle: {
    alignItems: 'center',
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
});
