import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../../styles/global-styles";

interface Props {
  title: string;
  onPress?: () => void;
}

export const CustomTextButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={globalStyles.linkText}>{title}</Text>
    </TouchableOpacity>
  );
};
