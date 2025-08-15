import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  BackHandler,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { Product } from "../../interfaces/Products";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { globalStyles } from "../../../styles/global-styles";
import { ProductCard } from "./components/ProductCard";
import { CustomInputText } from "../../components/CustomInputText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppColors } from "../../constants/AppColors";
import { CategoryMenu } from "./components/CategoryMenu";
import { Wishlist } from "../../interfaces/Wishlist";
import { Cart } from "../../interfaces/Cart";

interface HomeScreenProps {
  products: Product[];
  wishlist: Wishlist[];
  setWishlist: (product: Wishlist) => void;
  cart: Cart[];
  addCart: (product: Product, quantity: number) => void;
}

export const HomeScreen = ({
  products,
  wishlist,
  setWishlist,
  cart,
  addCart,
}: HomeScreenProps) => {
  const navigation = useNavigation();
  const [lisProducts, setListProducts] = useState<Product[]>(products);

  useEffect(() => {
    //TODO: AL AGREGAR PRODUCTO SE BORRA EL FILTRO
    setListProducts(products);
  }, [products]);

  //! Cerrar sesion
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "SignIn" }],
          })
        );

        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription?.remove();
    }, [navigation])
  );

  const handleSortListProducts = (category: string) => {
    if (category === "Todo") {
      setListProducts(products);
    } else {
      const filter = products.filter((p) => p.category === category);
      setListProducts(filter);
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setListProducts(products);
    } else {
      const filter = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setListProducts(filter);
    }
  };

  const handleWishlist = (idProduct: number) => {
    const newProductWishlist: Wishlist = {
      idProduct: idProduct,
    };

    setWishlist(newProductWishlist);
  };

  return (
    <SafeAreaView style={homeScreenStyle.container}>
      <View style={homeScreenStyle.header}>
        <Text style={globalStyles.title}>Productos</Text>
        <TouchableOpacity
          style={homeScreenStyle.iconCartContainer}
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: "Cart" }))
          }
        >
          <View>
            <MaterialIcons name="shopping-cart" size={24} color="black" />
          </View>
          <View style={homeScreenStyle.textIconCartContainer}>
            <Text style={homeScreenStyle.textIconCart}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 16 }}>
        <CustomInputText
          placeholder={"Buscar..."}
          onChangeText={(prop, value) => handleSearch(value)}
          property={"buscar"}
          keyboardType={"default"}
          suffixcon={
            <Ionicons
              name="search-outline"
              size={24}
              color={AppColors.disabled}
            />
          }
        />
      </View>
      <CategoryMenu onPress={(category) => handleSortListProducts(category)} />
      <FlatList
        data={lisProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isWishlist = wishlist.some((w) => w.idProduct === item.id);
          return (
            <ProductCard
              product={item}
              isWishlist={isWishlist}
              setWishlist={() => handleWishlist(item.id)}
              addCart={addCart}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const homeScreenStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconCartContainer: {},
  textIconCartContainer: {
    position: "absolute",
    backgroundColor: AppColors.error,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    top: -6,
    right: -6,
  },
  textIconCart: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
});
