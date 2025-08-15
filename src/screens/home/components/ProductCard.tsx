import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../../../interfaces/Products";
import { AppColors } from "../../../constants/AppColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppSizes } from "../../../constants/AppSizes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  product: Product;
  isWishlist: boolean;
  setWishlist: () => void;
  addCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({
  product,
  isWishlist,
  setWishlist,
  addCart,
}: Props) => {
  return (
    <View style={productCardStyle.container}>
      <View>
        <Image
          source={{ uri: product.pathImage }}
          style={{ ...productCardStyle.image }}
        />
        <TouchableOpacity
          style={productCardStyle.buttonWishlist}
          onPress={setWishlist}
        >
          <Ionicons
            name={isWishlist ? "heart-sharp" : "heart-outline"}
            size={24}
            color={isWishlist ? AppColors.error : AppColors.gray3}
          />
        </TouchableOpacity>
      </View>
      <View style={productCardStyle.cardContent}>
        <View>
          <Text style={productCardStyle.title}>{product.name}</Text>
        </View>
        <View style={productCardStyle.priceContent}>
          <View style={productCardStyle.priceContainer}>
            <Text style={productCardStyle.price}>
              $
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
            </Text>
            <Text style={productCardStyle.discount}>
              {product.discount > 0 ? `${product.price.toFixed(2)}` : ""}
            </Text>
          </View>
          <TouchableOpacity
            disabled={product.stock < 1}
            style={{
              ...productCardStyle.addButton,
              backgroundColor:
                product.stock < 1 ? AppColors.disabled : AppColors.mainColor,
            }}
            onPress={() => addCart(product, 1)}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const productCardStyle = StyleSheet.create({
  container: {
    flexBasis: "46%",
    maxWidth: "46%",
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
    paddingBottom: 6,
  },
  priceContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "medium",
    color: AppColors.gray3,
    paddingLeft: 6,
  },
  discount: {
    fontSize: 12,
    color: AppColors.error,
    paddingHorizontal: 6,
    textDecorationLine: "line-through",
    textDecorationColor: AppColors.error,
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
