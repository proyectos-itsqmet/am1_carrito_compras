import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../../../interfaces/Products";
import { AppColors } from "../../../constants/AppColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppSizes } from "../../../constants/AppSizes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <View style={productCardStyle.container}>
      <View>
        <Image
          source={{ uri: product.pathImage }}
          style={{ ...productCardStyle.image }}
        />
        <TouchableOpacity style={productCardStyle.buttonWishlist}>
          <Ionicons name="heart-outline" size={24} color={AppColors.gray3} />
        </TouchableOpacity>
      </View>
      <View style={productCardStyle.cardContent}>
        <View>
          <Text style={productCardStyle.title}>{product.name}</Text>
          <Text style={productCardStyle.price}>${product.price}</Text>
        </View>
        <TouchableOpacity style={productCardStyle.addButton}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const productCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    overflow: "hidden",
    backgroundColor: AppColors.gray4,
    borderRadius: AppSizes.radiusXL,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "stretch",
    borderRadius: AppSizes.radiusXL,
    borderWidth: 4,
    borderColor: AppColors.gray4,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    marginTop: 6,
    paddingHorizontal: 6,
    fontSize: 14,
    fontWeight: "900",
    color: AppColors.mainColorText,
  },
  price: {
    fontSize: 14,
    fontWeight: "medium",
    color: AppColors.gray3,
    paddingHorizontal: 6,
  },
  buttonWishlist: {
    height: 34,
    width: 34,
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: AppColors.gray1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: AppColors.mainColor,
    height: 36,
    width: 36,
    alignSelf: "flex-end",
    borderTopLeftRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
