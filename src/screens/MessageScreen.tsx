import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {PostItem} from '../components/PostItem';
import {DefaultTheme, Searchbar} from 'react-native-paper';
import {Colors} from '../utils/Colors';
type Post = {
  id: string;
  postedBy: string;
  content: string;
  sendAt: Date;
  senderPhoto: string;
  friendLevelStories: number;
};

const mockData = [
  {
    id: '649f3d41b394654aec378977',
    postedBy: 'lucas',
    content: 'www.imagem.com',
    sendAt: new Date(2023, 6, 7, 22, 52, 11),
    senderPhoto:
      'https://t4.ftcdn.net/jpg/01/44/59/65/360_F_144596516_QKBKJW8fSrWYBW7S4BHAVcegYq5nCwXT.jpg',
    friendLevelStories: 23,
  },
  {
    id: '649f3d41b394654aec378937',
    postedBy: 'pedro',
    content: 'www.pedro.com',
    sendAt: new Date(2023, 6, 7, 23, 27, 23),
    senderPhoto:
      'https://cdn.dxomark.com/wp-content/uploads/medias/post-137334/Amadeus30cm_GooglePixel7_DxOMark_Selfie_05-00.jpg',
    friendLevelStories: 5,
  },
  {
    id: '649f3d41b394654aec378637',
    postedBy: 'carlao',
    content: 'www.carlao.com',
    sendAt: new Date(2023, 6, 7, 21, 0, 23),
    senderPhoto:
      'https://st3.depositphotos.com/6672578/15113/i/600/depositphotos_151133958-stock-photo-man-taking-selfie.jpg',
    friendLevelStories: 2,
  },
];
function MessageScreen() {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Post[]>(mockData);

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filteredPosts = mockData.filter(post =>
      post.postedBy.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredData(filteredPosts);
  };
  const theme = {
    ...DefaultTheme,
    roundness: 1,
  };
  return (
    <View>
      <View style={styles.searchbarContainer}>
        <Searchbar
          iconColor={Colors.primary}
          placeholder="Search"
          theme={theme}
          onChangeText={handleSearch}
          value={searchText}
          style={styles.searchbar}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <PostItem
            username={item.postedBy}
            sendAt={item.sendAt}
            senderPhoto={item.senderPhoto}
            friendLevelStories={item.friendLevelStories}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchbarContainer: {
    backgroundColor: '#FFF',
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 4,
  },
  searchbar: {backgroundColor: 'transparent'},
});
export default MessageScreen;
