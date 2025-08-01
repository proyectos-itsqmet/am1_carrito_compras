import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { AppColors } from "../constants/AppColors";
import { AppSizes } from "../constants/AppSizes";

export const CustomCheckbox = () => {
  return <TouchableOpacity style={styles.container}></TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: AppColors.disabled,
    borderRadius: AppSizes.radiusSM,
  },
});
``;
