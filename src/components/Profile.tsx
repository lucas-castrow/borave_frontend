import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface ProfileProps {
  initialPhotoUrl: string;
  username: string;
  friendCount: number;
  postCount: number;
}

const Profile: React.FC<ProfileProps> = ({
  initialPhotoUrl,
  username,
  friendCount,
  postCount,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>(initialPhotoUrl);
  const handlePhotoPress = () => {
    //implementar para procurar galeria
    // fazer preview antes de confirmar
    //ao confirmar publicar no amazon s3 e pegar o link
    setPhotoUrl(
      'https://img.freepik.com/fotos-gratis/close-up-sorridente-homem-tirando-uma-selfie_23-2149155156.jpg',
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePhotoPress}>
        <Image style={styles.photo} source={{uri: photoUrl}} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.friendCount}>Friends: {friendCount}</Text>
        <Text style={styles.postCount}>Posts: {postCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  userInfo: {
    marginLeft: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendCount: {
    fontSize: 14,
  },
  postCount: {
    fontSize: 14,
  },
});

export default Profile;
