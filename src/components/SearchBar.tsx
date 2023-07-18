import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  onChangeText: (text: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({onChangeText, placeholder}) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={25} color="#19631c" />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 1,
    paddingHorizontal: 12,
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    marginBottom: 5,
    marginTop: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
  },
});

export default SearchBar;
