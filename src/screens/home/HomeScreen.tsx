import React, { useState } from "react";
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
import { products } from "../../constants/Products";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { globalStyles } from "../../../styles/global-styles";
import { ProductCard } from "./components/ProductCard";
import { CustomInputText } from "../../components/CustomInputText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppColors } from "../../constants/AppColors";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [productList, setProductList] = useState<Product[]>(products);

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

  return (
    <SafeAreaView style={homeScreenStyle.container}>
      <View style={homeScreenStyle.header}>
        <Text style={globalStyles.title}>Productos</Text>
        <TouchableOpacity>
          <MaterialIcons name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 16 }}>
        <CustomInputText
          placeholder={"Buscar..."}
          onChangeText={() => {}}
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
      <FlatList
        data={productList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 24 }}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
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
});
