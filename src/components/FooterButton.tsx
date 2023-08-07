import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';
type ActionFunction = () => void;
const FooterButton: React.FC<{action: ActionFunction}> = ({action}) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.enviarFotoButton} onPress={action}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  enviarFotoButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FooterButton;
