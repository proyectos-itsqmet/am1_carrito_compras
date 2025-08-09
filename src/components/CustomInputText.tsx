import React from "react";
import {
  KeyboardTypeOptions,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../../styles/global-styles";

interface Props {
  placeholder: string;
  onChangeText: (property: string, value: string) => void;
  property: string;
  onPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType: KeyboardTypeOptions;
  suffixcon?: React.ReactNode;
}

export const CustomInputText = ({
  placeholder,
  onChangeText,
  property,
  onPress,
  secureTextEntry = false,
  keyboardType,
  suffixcon,
}: Props) => {
  return (
    <View style={globalStyles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        onChangeText={(value) => onChangeText(property, value)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity onPress={onPress}>
        {suffixcon && <View>{suffixcon}</View>}
      </TouchableOpacity>
    </View>
  );
};
