import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  ...props
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primary : styles.secondary,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    disabled && styles.disabledText,
  ];

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress} disabled={disabled} {...props}>
        <View style={buttonStyle}>
          <Text style={textStyle}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyle} {...props}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: Platform.OS === 'ios' ? 16 : 12,
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#007AFF',
  },
  disabledText: {
    color: '#999999',
  },
});