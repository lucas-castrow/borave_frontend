import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {
  Camera,
  CameraCaptureError,
  CameraPosition,
  useCameraDevices,
} from 'react-native-vision-camera';
import {RootTabParamList} from '../routes/RootStackParams';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import FastImage from 'react-native-fast-image';
import {SendButton} from '../components/buttons/SendButton';
import {Colors} from '../utils/Colors';
type CameraScreenProp = MaterialTopTabNavigationProp<
  RootTabParamList,
  'Camera'
>;
export function CameraScreen() {
  const navigation = useNavigation<CameraScreenProp>();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();

  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const [imageSource, setImageSource] = useState<string>('');
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const device = cameraPosition === 'front' ? devices.front : devices.back;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Message');
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);
  function handleCloseCamera() {
    if (showPhoto) {
      setShowPhoto(false);
      setImageSource('');
      return true;
    }
    navigation.navigate('Message');
  }
  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') {
        await Linking.openSettings();
      }
    }
    getPermission();
  }, []);

  const onPress = useCallback(async () => {
    try {
      if (camera.current != null) {
        const photo = await camera.current.takePhoto({
          qualityPrioritization: 'balanced',
          enableAutoDistortionCorrection: true,
          flash: isFlashOn ? 'on' : 'off',
        });
        setImageSource(photo.path);
        setShowPhoto(true);
      }
    } catch (e) {
      if (e instanceof CameraCaptureError) {
        switch (e.code) {
          case 'capture/file-io-error':
            console.error('Failed to write photo to disk!');
            break;
          default:
            console.error(e);
            break;
        }
      }
    }
  }, [camera, isFlashOn]);
  function handleCameraPosition() {
    setCameraPosition(prevState => (prevState === 'front' ? 'back' : 'front'));
  }
  function handleToggleFlash() {
    if (cameraPosition === 'back') {
      setIsFlashOn(prevState => !prevState);
    }
  }
  if (device == null) {
    return <Text>Sem camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <IconButton
          iconColor="white"
          icon={'window-close'}
          size={35}
          onPress={handleCloseCamera}
        />
      </View>
      {!showPhoto ? (
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={isFocused}
          enableZoomGesture={true}
          photo={true}
        />
      ) : (
        <FastImage
          style={styles.camera}
          source={{uri: 'file://' + imageSource}}
        />
      )}

      <View style={styles.content}>
        <View style={styles.buttonsContainer}>
          {!showPhoto ? (
            <>
              <IconButton
                iconColor="#fff"
                icon="camera-flip"
                size={30}
                onPress={handleCameraPosition}
              />
              <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.takePhoto} />
              </TouchableWithoutFeedback>

              <IconButton
                iconColor="#fff"
                icon={isFlashOn ? 'flash' : 'flash-off'}
                size={30}
                onPress={handleToggleFlash}
              />
            </>
          ) : (
            <SendButton
              size={60}
              color={Colors.white}
              backgroundColor={Colors.secondary}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  options: {
    position: 'absolute',
    zIndex: 1,
    right: 24,
    top: 100,
  },
  content: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: 52,
    bottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  takePhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  buttonContent: {
    borderWidth: 0,
  },
  topButtons: {
    position: 'absolute',
    zIndex: 2,
    top: 3,
    left: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
