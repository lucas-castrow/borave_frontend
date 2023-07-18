import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {Colors} from '../utils/Colors';
import {acceptFriendship} from '../services/profileService';

interface FriendRequestItemProps {
  id: string;
  username: string;
  name: string;
  photo: string;
}

export function FriendRequestItem({
  id,
  username,
  name,
  photo,
}: FriendRequestItemProps) {
  const openProfilePhoto = () => {
    console.log('Abriu foto de perfil de amigo');
  };

  const handleAcceptRequest = async () => {
    try {
      const response = await acceptFriendship(id);
      console.log(response);
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        console.log(errorMessage);
      }
    }
  };
  const handleDeclineRequest = async () => {
    try {
      const response = await declineFriendship(id);
      console.log(response);
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        console.log(errorMessage);
      }
    }
  };

  return (
    <View>
      <Card style={styles.container}>
        <Card.Content style={styles.userInfo}>
          <TouchableHighlight
            onPress={openProfilePhoto}
            style={{borderRadius: 12}}>
            <View style={styles.containerPhoto}>
              {photo ? (
                <FastImage
                  style={styles.photo}
                  source={{uri: photo}}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : (
                <IconButton icon="account" size={50} style={styles.photo} />
              )}
            </View>
          </TouchableHighlight>
          <View style={styles.userInfoText}>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.message}>{username}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <IconButton
              icon="close"
              iconColor={Colors.buttons.error}
              size={25}
              onPress={() => console.log('Friend not accepted')}
            />

            <IconButton
              icon="check"
              iconColor={Colors.buttons.success}
              size={25}
              onPress={handleAcceptRequest}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    backgroundColor: '#FFF',
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
    color: 'black',
  },
  message: {
    fontSize: 12,
    color: 'black',
  },
  containerPhoto: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  photo: {
    width: 50,
    height: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 1,
  },
});
