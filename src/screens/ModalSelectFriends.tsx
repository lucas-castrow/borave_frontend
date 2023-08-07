import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DefaultTheme, Divider, IconButton, Searchbar} from 'react-native-paper';
import {Colors} from '../utils/Colors';
import {ProfileType} from '../types/types';
import {FriendListCheck} from '../components/FriendListCheck';
import FooterButton from '../components/FooterButton';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchFriends} from '../app/thunks/friendThunks';
import {sendPost} from '../services/postService';

interface ModalSelectFriendsProps {
  visible: boolean;
  hideModal: () => void;
  handleBackAfterPost: () => void;
}

const ModalSelectFriends: React.FC<ModalSelectFriendsProps> = ({
  visible,
  hideModal,
  handleBackAfterPost,
}) => {
  const {width, height} = Dimensions.get('window');
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useAppDispatch();
  const friends = useAppSelector(state => state.friend.friends);
  const [filteredData, setFilteredData] = useState<ProfileType[]>(friends);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);
  useEffect(() => {
    setFilteredData(friends);
  }, [friends]);
  const handleSearch = (text: string) => {
    setSearchText(text);

    const filteredPosts = friends.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredData(filteredPosts);
  };
  const containerStyle = {
    backgroundColor: Colors.white,
    width: width,
    height: height * 0.8,
  };
  const handleToggleSelection = (id: string) => {
    setSelectedIds(prevIds => {
      console.log(selectedIds);
      if (prevIds.includes(id)) {
        return prevIds.filter(item => item !== id);
      }
      return [...prevIds, id];
    });
  };
  const handleSendButton = async () => {
    try {
      const response = await sendPost(
        'https://dw0i2gv3d32l1.cloudfront.net/uploads/stage/stage_image/63833/optimized_large_thumb_stage.jpg',
        selectedIds,
      );
      hideModal();
      handleBackAfterPost();
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        console.log(errorMessage);
      }
    }
  };

  const isItemSelected = (id: string) => selectedIds.includes(id);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={hideModal}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, containerStyle]}>
          <View style={styles.header}>
            <IconButton
              icon={'arrow-left'}
              size={35}
              iconColor={Colors.primary}
              onPress={hideModal}
            />
            <Text>Send to</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.searchbarContainer}>
              <Searchbar
                iconColor={Colors.primary}
                placeholder="Search friend"
                theme={theme}
                onChangeText={handleSearch}
                value={searchText}
                style={styles.searchbar}
              />
            </View>
            <View style={styles.friendlist}>
              <Text>Your Friends</Text>
              <Divider />
              <FlatList
                refreshing={true}
                data={filteredData}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <FriendListCheck
                    item={item}
                    isItemSelected={isItemSelected}
                    handleToggleSelection={handleToggleSelection}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <FooterButton action={handleSendButton} />
      </View>
    </Modal>
  );
};
const theme = {
  ...DefaultTheme,
  roundness: 1,
};
const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  searchbarContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 4,
  },
  searchbar: {backgroundColor: 'rgba(0, 0, 0, 0.1)'},
  content: {
    paddingHorizontal: 10,
    flex: 1,
  },
  friendlist: {
    paddingTop: 15,
  },
});

export default ModalSelectFriends;
