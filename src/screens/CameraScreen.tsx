import React, {useEffect, useRef, useState} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {
  Camera,
  CameraPosition,
  useCameraDevices,
} from 'react-native-vision-camera';

export function CameraScreen() {
  const camera = useRef(null);
  const devices = useCameraDevices();

  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const [imageSource, setImageSource] = useState<string>('');
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const device = cameraPosition === 'front' ? devices.front : devices.back;

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') {
        await Linking.openSettings();
      }
    }
    getPermission();
    setShowCamera(true);
  }, []);
  // const capturePhoto = async () => {
  //   if (camera.current !== null) {
  //     const photo = await camera.current.takePhoto({});
  //     setImageSource(photo.path);
  //     setShowCamera(false);
  //     console.log(photo.path);
  //   }
  // };
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
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        torch={isFlashOn ? 'on' : 'off'}
        photo={true}
      />

      <View style={styles.content}>
        <View style={styles.buttonsContainer}>
          <IconButton
            iconColor="#fff"
            icon={isFlashOn ? 'flash' : 'flash-off'}
            size={30}
            onPress={handleToggleFlash}
          />
          <TouchableWithoutFeedback
            onPress={() => console.log('Botão pressionado!')}>
            <View style={styles.takePhoto} />
          </TouchableWithoutFeedback>
          <IconButton
            iconColor="#fff"
            icon="camera-flip"
            size={30}
            onPress={handleCameraPosition}
          />
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
    flexDirection: 'row',
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
});
