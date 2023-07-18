import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Colors} from '../utils/Colors';

export function FriendRequestsScreen() {
  const [username, setUsername] = useState<string>('');
  return (
    <View style={styles.containerAddFriend}>
      <TextInput
        theme={{colors: {primary: Colors.primary}}}
        mode="outlined"
        style={styles.input}
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <View style={styles.button}>
        <Button
          icon="account-plus"
          theme={{colors: {primary: '#009153'}, roundness: 1}}
          mode="contained"
          onPress={() => {}}>
          <Text>Add Friend</Text>
        </Button>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingTop: 5,
  },
  input: {
    height: 40,
    justifyContent: 'center',
    width: screenWidth * 0.6,
    fontSize: 12,
    backgroundColor: '#fff',
  },
  containerAddFriend: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingLeft: 8,
  },
});
