import React from 'react';
import { TextInput } from 'react-native';

export default function FormInput({ placeholder, placeholderTextColor, ...rest }) {
  return (
    <React.Fragment>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        numberOfLines={1}
        {...rest}
      />
    </React.Fragment>
  );
}
