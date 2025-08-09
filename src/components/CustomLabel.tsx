import React from "react";
import { globalStyles } from "../../styles/global-styles";
import { Text } from "react-native";

interface Props {
  title: string;
}

export const CustomLabel = ({ title }: Props) => {
  return <Text style={{ ...globalStyles.label, paddingLeft: 4 }}>{title}</Text>;
};
