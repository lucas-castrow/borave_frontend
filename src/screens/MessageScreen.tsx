import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {PostItem} from '../components/PostItem';
import {DefaultTheme, Searchbar} from 'react-native-paper';
import {Colors} from '../utils/Colors';
import {PostType} from '../types/types';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchPosts} from '../app/thunks/postThunks';
function MessageScreen() {
  const [searchText, setSearchText] = useState<string>('');
  const posts = useAppSelector(state => state.posts.posts);
  const [filteredData, setFilteredData] = useState<PostType[]>(posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(posts);
  }, [posts]);

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filteredPosts = posts.filter(post =>
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
            username={item.postedUsername}
            sendAt={item.sendAt}
            senderPhoto={item.senderPhoto}
            content={item.content}
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
