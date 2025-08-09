import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../../styles/global-styles";
import { AppColors } from "../constants/AppColors";

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const CustomButton = ({ title, onPress, disabled = false }: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...globalStyles.button,
        backgroundColor: disabled ? AppColors.disabled : AppColors.mainColor,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
