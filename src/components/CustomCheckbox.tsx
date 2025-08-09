import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { AppColors } from "../constants/AppColors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const CustomCheckbox = () => {
  const [check, setCheck] = useState<boolean>(false);

  return (
    <TouchableOpacity
      onPress={() => setCheck(!check)}
      style={{ width: 24, height: 24 }}
    >
      <FontAwesome
        name={check ? "check-square" : "square-o"}
        size={24}
        color={check ? AppColors.success : AppColors.disabled}
      />
    </TouchableOpacity>
  );
};
