import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {Colors} from '../utils/Colors';
import {IconButton} from 'react-native-paper';
import {bucketName, s3} from '../utils/aws-exports';
import FastImage from 'react-native-fast-image';

interface StorieProps {
  contents: Array<string>;
  visible: boolean;
  hideModal: () => void;
}

const Storie: React.FC<StorieProps> = ({contents, visible, hideModal}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [storieUrls, setStorieUrls] = useState<string[]>([]);
  const [nextImageLoading, setNextImageLoading] = useState<boolean>(false);

  const handleNextImageLoadStart = () => {
    setNextImageLoading(true);
  };

  const handleNextImageLoadEnd = () => {
    setNextImageLoading(false);
  };
  useEffect(() => {
    const generatePresignedUrl = async (imageKey: string) => {
      const params = {
        Bucket: bucketName,
        Key: imageKey,
        Expires: 3600,
      };

      const url = await s3.getSignedUrlPromise('getObject', params);
      return url;
    };

    const fetchUrls = async () => {
      const urls = await Promise.all(
        contents.map((imageKey: string) => generatePresignedUrl(imageKey)),
      );
      setStorieUrls(urls);
    };

    fetchUrls();
  }, [contents]);
  const handleNextPost = () => {
    if (!nextImageLoading && currentIndex < storieUrls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === storieUrls.length - 1) {
      hideModal();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={hideModal}>
      <TouchableWithoutFeedback onPress={handleNextPost}>
        <View style={styles.container}>
          <FastImage
            source={{uri: storieUrls[currentIndex]}}
            style={styles.storieImage}
            onLoadStart={handleNextImageLoadStart}
            onLoadEnd={handleNextImageLoadEnd}
          />
          <View style={styles.btnNext}>
            <View style={styles.btnNextInner}>
              <Text style={styles.btnNextText}>
                {currentIndex + 1}/{storieUrls.length}
              </Text>
              {storieUrls.length > 0 ? (
                <IconButton
                  icon="arrow-right-bold-box"
                  iconColor={Colors.secondary}
                  size={35}
                  onPress={handleNextPost}
                  disabled={currentIndex === storieUrls.length - 1}
                />
              ) : null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  storieImage: {
    flex: 1,
  },
  btnNext: {
    position: 'absolute',
    right: 4,
  },
  btnNextInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnNextText: {
    marginLeft: 2,
    fontSize: 14,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default Storie;
