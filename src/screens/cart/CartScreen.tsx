import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../styles/global-styles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProductCardHorizontal } from "./components/ProductCardHorizontal";
import { Cart } from "../../interfaces/Cart";
import { AppColors } from "../../constants/AppColors";
import { Product } from "../../interfaces/Products";
import { CheckoutModal } from "./components/CheckoutModal";

interface CartScreenProps {
  cart: Cart[];
  addCart: (product: Cart, quantity: number) => void;
  products: Product[];
  pay: () => void;
}

export const CartScreen = ({
  cart,
  addCart,
  products,
  pay,
}: CartScreenProps) => {
  const navigation = useNavigation();
  const [listCart, setListCart] = useState<Cart[]>(cart);
  const [listProducts, setListProducts] = useState<Product[]>(products);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setListCart(cart);
    setListProducts(products);
  }, [cart, products]);

  const handleCalcularSubtotal = () => {
    return listCart.reduce((total, cartItem) => {
      const product = listProducts.find((p) => p.id === cartItem.id);
      if (product) {
        const descuento = product.price * (1 - product.discount / 100);
        return total + descuento * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  const handleCalcularIVA = (subtotal: number) => {
    return subtotal * 0.15;
  };

  const handleCalcularTotal = (subtotal: number, iva: number) => {
    return subtotal + iva;
  };

  const subtotal = handleCalcularSubtotal();
  const iva = handleCalcularIVA(subtotal);
  const total = handleCalcularTotal(subtotal, iva);

  return (
    <SafeAreaView style={cartScreenStyle.container}>
      <View style={cartScreenStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={globalStyles.title}>Mi carrito</Text>
      </View>
      <View style={cartScreenStyle.listContainer}>
        <FlatList
          data={listCart}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const product = listProducts.find((p) => p.id === item.id);

            return (
              <ProductCardHorizontal
                productCart={item}
                addCart={addCart}
                product={product}
              />
            );
          }}
          ListFooterComponent={
            <View>
              <View style={cartScreenStyle.totalContainer}>
                <Text style={{ ...globalStyles.title, fontSize: 24 }}>
                  Resumen del pedido
                </Text>
                <View style={cartScreenStyle.totalRowContainer}>
                  <Text style={{ color: AppColors.secondaryColor }}>
                    Sub Total
                  </Text>
                  <Text style={cartScreenStyle.price}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>
                <View style={cartScreenStyle.totalRowContainer}>
                  <Text style={{ color: AppColors.secondaryColor }}>
                    IVA (15%)
                  </Text>
                  <Text style={cartScreenStyle.price}>${iva.toFixed(2)}</Text>
                </View>
                <View style={globalStyles.separator} />
                <View style={cartScreenStyle.totalRowContainer}>
                  <Text style={cartScreenStyle.totalText}>Total</Text>
                  <Text style={cartScreenStyle.totalText}>
                    ${total.toFixed(2)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  ...globalStyles.button,
                  backgroundColor:
                    cart.length === 0
                      ? AppColors.disabled
                      : AppColors.mainColor,
                }}
                onPress={() => setShowModal(!showModal)}
                disabled={cart.length === 0}
              >
                <Text style={globalStyles.buttonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          }
          ListFooterComponentStyle={{ marginBottom: 200 }}
        />
      </View>
      <CheckoutModal
        setShowModal={() => setShowModal(!showModal)}
        visible={showModal}
        pay={pay}
      />
    </SafeAreaView>
  );
};

const cartScreenStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  totalContainer: {
    gap: 12,
    marginTop: 24,
    marginBottom: 80,
    paddingHorizontal: 12,
  },
  totalRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "medium",
    fontSize: 16,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 12,
  },
});
