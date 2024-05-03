import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../utils/styles.js';

const Button = ({ children, onPress, customStyles }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, customStyles]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 144,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.colorDark,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;