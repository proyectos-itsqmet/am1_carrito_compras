import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { categories } from "../../../constants/Categories";
import { AppColors } from "../../../constants/AppColors";
import { AppSizes } from "../../../constants/AppSizes";

interface Props {
  onPress: (category: string) => void;
}

export const CategoryMenu = ({ onPress }: Props) => {
  const [categorySelect, setCategorySlect] = useState<number>(1);

  return (
    <View style={stylesCategoryMenu.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onPress(item.name);
              setCategorySlect(item.id);
            }}
            style={
              item.id === categorySelect
                ? stylesCategoryMenu.selectButton
                : stylesCategoryMenu.button
            }
          >
            <Text
              key={item.id}
              style={
                item.id === categorySelect
                  ? stylesCategoryMenu.selectTextButton
                  : stylesCategoryMenu.textButton
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const stylesCategoryMenu = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: AppSizes.radiusLG,
    borderWidth: 1,
    borderColor: AppColors.disabled,
  },
  selectButton: {
    backgroundColor: AppColors.mainColor,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: AppSizes.radiusLG,
  },
  textButton: {
    fontSize: 14,
    color: "black",
    fontWeight: "medium",
  },
  selectTextButton: {
    fontSize: 14,
    color: "white",
    fontWeight: "900",
  },
});
