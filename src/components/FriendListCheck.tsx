import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Avatar, Checkbox, List} from 'react-native-paper';
import {Colors} from '../utils/Colors';

interface FriendListCheckProps {
  item: {
    id: string;
    name: string;
    username: string;
    photo: string | null;
  };
  isItemSelected: (id: string) => boolean;
  handleToggleSelection: (id: string) => void;
}

function sideItens(
  side: 'left' | 'right',
  isItemSelected: (id: string) => boolean,
  item: FriendListCheckProps['item'],
) {
  if (side === 'left') {
    return (
      <View style={[styles.containerPhoto, styles.border]}>
        {item?.photo ? (
          <FastImage
            style={styles.photo}
            source={{uri: item?.photo}}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Avatar.Icon size={50} icon="account" style={styles.photo} />
        )}
      </View>
    );
  } else if (side === 'right') {
    return (
      <Checkbox.Item
        color={Colors.secondary}
        label=""
        status={isItemSelected(item.id) ? 'checked' : 'unchecked'}
      />
    );
  }
}

export function FriendListCheck({
  item,
  isItemSelected,
  handleToggleSelection,
}: FriendListCheckProps) {
  return (
    <List.Item
      style={styles.list}
      title={item.name}
      description={item.username}
      onPress={() => handleToggleSelection(item.id)}
      left={() => sideItens('left', isItemSelected, item)}
      right={() => sideItens('right', isItemSelected, item)}
    />
  );
}

const styles = StyleSheet.create({
  containerPhoto: {
    width: 46,
    height: 46,
    borderRadius: 46,
    overflow: 'hidden',
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  photo: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  list: {
    paddingRight: 0,
    paddingBottom: 0,
  },
});
