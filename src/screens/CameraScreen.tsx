import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {
  Camera,
  PhotoFile,
  CameraPosition,
  useCameraDevice,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
import CameraTab from '../components/CameraTab';
import React, {useEffect, useRef, useState} from 'react';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView';

const album_ic = require('../assets/album.png');
const camera_ic = require('../assets/camera_rotated.png');

const data = [{id: 1}, {id: 2, name: 'Photo'}, {id: 3, name: 'Video'}, {id: 4}];

const CameraScreen = () => {
  const [camView, setCamView] = useState<CameraPosition>('back');
  const [activeTab, setActiveTab] = useState<string | undefined>('Photo');

  const [recordVideo, setRecordVideo] = useState('');
  const [clickedPhoto, setClickedPhoto] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordAudio, setRecordAudio] = useState(false);

  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice(camView);

  const x = useSharedValue(0);
  const offSet = useSharedValue(0);
  const {width} = useWindowDimensions();
  const scrollViewRef = useAnimatedRef<AnimatedScrollView>();

  const SIZE = width * 0.17;
  const SPACER = (width - SIZE) / 2;

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: e => {
      offSet.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    async function givePermissions() {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      if (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        setRecordAudio(true);
      }
    }

    givePermissions();
  }, []);

  const onClickPhoto = async () => {
    const photo = (await cameraRef.current?.takePhoto()) as PhotoFile;
    setClickedPhoto(photo.path);
  };

  const onRecordingPres = () => {
    if (!cameraRef?.current) {
      return;
    }

    setIsRecording(true);
    cameraRef.current?.startRecording({
      onRecordingFinished: video => {
        setIsRecording(false);
        setRecordVideo(video.path);
      },
      onRecordingError: error => {
        setIsRecording(false);
      },
    });
  };

  const StopRecording = async () => {
    await cameraRef?.current?.stopRecording();
    setIsRecording(false);
  };

  if (device == null) return <Text>Camera not available</Text>;

  const renderImageView = () => {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: 'file://' + clickedPhoto}}
          style={StyleSheet.absoluteFillObject}
        />
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            setClickedPhoto('');
          }}>
          <Text style={styles.closwButtonText}>Close</Text>
        </Pressable>
      </View>
    );
  };

  const renderVideoView = () => {
    return (
      <Video
        source={{uri: recordVideo}}
        style={[StyleSheet.absoluteFillObject]}
        repeat={true}
        controls={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      {clickedPhoto && renderImageView()}
      {recordVideo && renderVideoView()}
      {!clickedPhoto && !recordVideo && (
        <>
          <Camera
            photo={true}
            video={true}
            device={device}
            isActive={true}
            ref={cameraRef}
            audio={recordAudio}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.bottomSubContainer}>
            <TouchableOpacity
              onPress={() => {
                camView === 'back' ? setCamView('front') : setCamView('back');
              }}>
              <Image source={camera_ic} style={styles.iconStyle} />
            </TouchableOpacity>
            <View style={styles.centerButtonView}>
              <TouchableOpacity
                onPress={() => {
                  if (activeTab === 'Photo') {
                    onClickPhoto();
                  } else if (!isRecording) {
                    onRecordingPres();
                    setIsRecording(true);
                  } else {
                    StopRecording();
                  }
                }}
                style={[
                  styles.centerButtonStyle,
                  {
                    backgroundColor: isRecording ? 'red' : '#FFFFFF',
                  },
                ]}
              />
            </View>
            <TouchableOpacity>
              <Image source={album_ic} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <Animated.ScrollView
            style={{
              position: 'absolute',
              bottom: 0,
            }}
            ref={scrollViewRef}
            onScrollEndDrag={() => {
              const currentIndex = Math.round(x.value / SIZE);
              setActiveTab(data[currentIndex + 1].name);
            }}
            onScroll={onScroll}
            scrollEventThrottle={16}
            horizontal
            bounces={false}
            decelerationRate="fast"
            snapToInterval={SIZE}
            showsHorizontalScrollIndicator={false}>
            {data?.map((item, index) => {
              return (
                <CameraTab
                  key={index}
                  index={index}
                  item={item}
                  x={x}
                  size={SIZE}
                  spacer={SPACER}
                  customeTextStyle={{
                    color: activeTab === item.name ? '#FFFFFF' : '#EAEAEA',
                    fontSize: 15,
                  }}
                />
              );
            })}
          </Animated.ScrollView>
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomMainContainer: {
    backgroundColor: 'green',
  },
  bottomSubContainer: {
    bottom: 0,
    position: 'absolute',
    gap: 62,
    marginBottom: 70,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconStyle: {
    height: 24,
    width: 24,
  },
  centerButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 99,
  },
  centerButtonView: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 99,
    borderColor: '#FFFFFF',
  },
  closeButton: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'gray',
  },
  closwButtonText: {
    color: 'white',
  },
});
