import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { AppSizes } from "../../../constants/AppSizes";
import { Cart } from "../../../interfaces/Cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Product } from "../../../interfaces/Products";

interface Props {
  productCart: Cart;
  addCart: (product: Cart, quantity: number) => void;
  product: Product | undefined;
}

export const ProductCardHorizontal = ({
  productCart,
  addCart,
  product,
}: Props) => {
  return (
    <View style={productCardHorizontalStyle.container}>
      <Image
        source={{ uri: productCart.pathImage }}
        style={{ ...productCardHorizontalStyle.image }}
      />
      <View style={productCardHorizontalStyle.cardContent}>
        <TouchableOpacity
          style={productCardHorizontalStyle.iconDelete}
          onPress={() => addCart(productCart, -productCart.quantity)}
        >
          <Ionicons name="trash-outline" size={16} color={AppColors.error} />
        </TouchableOpacity>
        <View style={productCardHorizontalStyle.addContainer}>
          <TouchableOpacity
            style={productCardHorizontalStyle.addButton}
            onPress={() => addCart(productCart, -1)}
          >
            <Text style={productCardHorizontalStyle.addTextButton}>-</Text>
          </TouchableOpacity>
          <Text>{productCart.quantity}</Text>
          <TouchableOpacity
            style={productCardHorizontalStyle.addButton}
            onPress={() => addCart(productCart, 1)}
            disabled={product!.stock < 1}
          >
            <Text
              style={{
                ...productCardHorizontalStyle.addTextButton,
                color: product!.stock < 1 ? AppColors.disabled : "black",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={productCardHorizontalStyle.title}>
            {productCart.name}
          </Text>
          <Text style={productCardHorizontalStyle.categoryText}>
            {productCart.category}
          </Text>
          {/* <Text>{product?.stock}</Text> */}
        </View>
        <View style={productCardHorizontalStyle.priceContent}>
          <Text style={productCardHorizontalStyle.price}>
            $
            {(
              productCart.price -
              (productCart.price * productCart.discount) / 100
            ).toFixed(2)}
          </Text>
          <Text style={productCardHorizontalStyle.discount}>
            ${productCart.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const productCardHorizontalStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: AppColors.gray1,
    borderRadius: AppSizes.radiusXL,
    gap: 12,
    marginBottom: 12,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "stretch",
    borderRadius: AppSizes.radiusXL,
    borderWidth: 1,
    borderColor: AppColors.disabled,
  },
  cardContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "900",
    color: AppColors.mainColorText,
  },
  categoryText: {
    fontSize: 14,
    color: AppColors.secondaryColor,
  },
  priceContent: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "medium",
    color: AppColors.gray3,
  },
  discount: {
    fontSize: 12,
    color: AppColors.error,
    textDecorationLine: "line-through",
    textDecorationColor: AppColors.error,
  },
  iconDelete: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  addContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    borderColor: AppColors.gray1,
    borderRadius: AppSizes.radiusLG,
    borderWidth: 2,
    height: 26,
    width: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  addTextButton: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
