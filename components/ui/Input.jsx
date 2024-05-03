import { View, Text, TextInput, StyleSheet } from 'react-native';

import { colors } from '../../utils/styles.js';

const Input = ({ label, keyboardType, secure, onUpdateValue, value, isInvalid, }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    color: colors.colorGray,
    marginBottom: 4,
  },
  labelInvalid: {
    color: colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: colors.colorLight,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: colors.error100,
  },
});