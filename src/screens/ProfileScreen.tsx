import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Profile from '../components/Profile';
import {FriendRequestItem} from '../components/FriendRequestItem';
import {AddFriend} from '../components/AddFriend';
import {getFriendsRequests} from '../services/profileService';

type ProfileType = {
  id: string;
  userId: string;
  name: string;
  username: string;
  photo: string;
  friends: Array<String>;
};

export function ProfileScreen() {
  const [friendRequests, setFriendRequests] = useState<Array<ProfileType>>([]);
  const fetchData = async () => {
    try {
      const data = await getFriendsRequests();
      console.log(data);
      setFriendRequests(data);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Profile
        initialPhotoUrl="https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg"
        username="lucascastro"
        friendCount={10}
        postCount={5}
      />
      <AddFriend />
      <FlatList
        data={friendRequests}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <FriendRequestItem
            id={item.id}
            name={item.name}
            username={item.username}
            photo={item.photo}
          />
        )}
      />
    </View>
  );
}
