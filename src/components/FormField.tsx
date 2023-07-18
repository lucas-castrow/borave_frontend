import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, Dimensions} from 'react-native';
interface FormFieldProps {
  label: string;
  value: string;
  type?: string;
  onChangeText: (text: string) => void;
  error?: string;
  countError?: number;
  stylesText?: any;
  stylesContainer?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  type = 'text',
  onChangeText,
  error,
  countError,
  stylesText,
  stylesContainer,
}) => {
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const inputStyle = isErrorVisible ? styles.errorInput : null;

  const handleTextChange = (text: string) => {
    setIsErrorVisible(false);
    onChangeText(text);
  };

  useEffect(() => {
    const lowercaseError = error?.toLowerCase();
    const lowercaseLabel = label.toLowerCase();
    setIsErrorVisible(
      lowercaseError
        ? lowercaseError.includes(lowercaseLabel) ||
            lowercaseError.includes('bad credentials')
        : false,
    );
  }, [countError, error, label]);

  return (
    <View style={stylesContainer ? stylesContainer : styles.container}>
      <TextInput
        style={stylesText ? stylesText : [styles.input, inputStyle]}
        placeholder={label}
        value={value}
        secureTextEntry={type === 'password' ? true : false}
        onChangeText={handleTextChange}
      />
      {isErrorVisible && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    width: screenWidth * 0.8,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default FormField;
