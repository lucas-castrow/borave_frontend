import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import Profile from '../components/Profile';
import {FriendRequestItem} from '../components/FriendRequestItem';
import {AddFriend} from '../components/AddFriend';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchFriendRequests} from '../app/thunks/friendThunks';

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const friendRequests = useAppSelector(state => state.friend.friendsRequests);
  useEffect(() => {
    dispatch(fetchFriendRequests());
  }, [dispatch]);

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
