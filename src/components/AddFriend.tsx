import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {Colors} from '../utils/Colors';
import {addFriend} from '../services/profileService';

export function AddFriend() {
  const [friendUsername, setFriendUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const handleAddFriend = async () => {
    try {
      const response = await addFriend(friendUsername);
      setMessage(response);
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        console.log(errorMessage);
        setMessage(errorMessage);
      } else {
        setMessage('Problema ao adicionar esse usuario');
      }
    }
  };

  const hasErrors = () => {
    if (message.length > 1) {
      if (
        message.toLowerCase().includes('not') ||
        message.toLowerCase().includes('problem')
      ) {
        return 'red';
      } else {
        return 'green';
      }
    }
  };

  return (
    <View style={styles.containerAddFriend}>
      <View>
        <TextInput
          theme={{colors: {primary: Colors.primary}}}
          mode="outlined"
          style={styles.input}
          label="Username"
          value={friendUsername}
          onChangeText={text => setFriendUsername(text)}
        />
        <HelperText
          theme={{colors: {error: hasErrors()}}}
          type={'error'}
          visible={message.length > 1}>
          {message}
        </HelperText>
      </View>
      <View style={styles.button}>
        <Button
          icon="account-plus"
          theme={{colors: {primary: '#009153'}, roundness: 1}}
          mode="contained"
          onPress={handleAddFriend}>
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
    paddingTop: 8,
    paddingLeft: 8,
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
