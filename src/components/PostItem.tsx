import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import {Card} from 'react-native-paper';
import {Colors} from '../utils/Colors';
import FastImage from 'react-native-fast-image';

interface PostItemProps {
  username: string;
  sendAt: Date;
  senderPhoto: string;
  friendLevelStories: number;
}

export function PostItem({
  username,
  sendAt,
  senderPhoto,
  friendLevelStories,
}: PostItemProps) {
  const openProfilePhoto = () => {
    console.log('Abriu foto de perfil de amigo');
  };
  const calculateRemainingHours = () => {
    const now = new Date(); // Tempo atual
    const differenceInMilliseconds = now.getTime() - sendAt.getTime(); // Diferença em milissegundos
    const elapsedHours = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60),
    ); // Horas decorridas desde sendAt
    const remainingHours = 24 - elapsedHours; // Horas restantes até completar 24 horas

    return remainingHours;
  };

  const remainingHours = calculateRemainingHours();
  return (
    <TouchableHighlight
      style={styles.touchableContainer}
      underlayColor="#DDDDDD"
      onPress={() => console.warn('clico')}>
      <Card style={styles.container}>
        <Card.Content style={styles.userInfo}>
          <TouchableHighlight onPress={openProfilePhoto} style={styles.border}>
            <View style={[styles.containerPhoto, styles.border]}>
              <FastImage
                style={styles.photo}
                source={{uri: senderPhoto}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.userInfoText}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.message}>
              restam {remainingHours} horas para visualizar
            </Text>
          </View>
          <View style={styles.friendLevelContainer}>
            <Text style={styles.friendLevelStories}>{friendLevelStories}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    overflow: 'hidden',
  },
  container: {
    marginVertical: 2,
    marginHorizontal: 8,
    backgroundColor: Colors.primary,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: {
    marginLeft: 16,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  message: {
    fontSize: 12,
    color: Colors.primaryText,
  },
  friendLevelContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendLevelStories: {
    color: Colors.primaryText,
    fontSize: 14,
  },
  containerPhoto: {
    overflow: 'hidden',
  },
  photo: {
    width: 45,
    height: 45,
  },
  border: {
    borderRadius: 20,
  },
});
