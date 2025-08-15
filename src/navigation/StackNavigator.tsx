import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "../screens/SignInScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { CartScreen } from "../screens/cart/CartScreen";
import { User } from "../interfaces/User";
import { users } from "../constants/Users";
import { FormLogin } from "../interfaces/FormLogin";
import { Cart } from "../interfaces/Cart";
import { cart } from "../constants/Cart";
import { Wishlist } from "../interfaces/Wishlist";
import { wishlistProducts } from "../constants/WishlistProducts";
import { Product } from "../interfaces/Products";
import { products } from "../constants/Products";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const [listUsers, setListUsers] = useState<User[]>(users);
  const [newUser, setNewUser] = useState<FormLogin | null>(null);

  const [listProducts, setListProducts] = useState<Product[]>(products);
  const [listCart, setListCart] = useState<Cart[]>(cart);
  const [wishlist, setWishlist] = useState<Wishlist[]>(wishlistProducts);

  const addUser = (user: User): void => {
    setListUsers([...listUsers, user]); //! Añadir nuevo usuario
    setNewUser({ email: user.email, password: user.password });
  };

  const handleWishlist = (product: Wishlist) => {
    const validate = wishlist.find(
      (item) => item.idProduct === product.idProduct
    );

    if (validate) {
      const updatedWishlist = wishlist.filter(
        (item) => item.idProduct !== product.idProduct
      );
      setWishlist(updatedWishlist);
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const handleCart = (product: Cart) => {
    const validate = listCart.find((item) => item.id === product.id);

    if (validate) {
      const updatedProducts = listCart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          };
        }
        return item;
      });

      setListCart(updatedProducts);
    } else {
      setListCart([...listCart, product]);
    }
  };

  const handleProducts = (product: Product, quantity: number) => {
    const validate = listProducts.find((item) => item.id === product.id);

    if (validate && validate.stock - quantity < 0) {
      return;
    }

    const updatedProducts = listProducts.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          stock: item.stock - quantity,
        };
      }
      return item;
    });

    setListProducts(updatedProducts);

    const addCart: Cart = {
      id: product.id,
      name: product.name,
      quantity: quantity,
      price: product.price,
      pathImage: product.pathImage,
      discount: product.discount,
      category: product.category,
    };

    handleCart(addCart);
  };

  const handleCartScreen = (product: Cart, quantity: number) => {
    const validate = listCart.find((item) => item.id === product.id);

    //TODO: Codigo repetido
    if (validate) {
      //! Si la cantidad del producto en el carrito es 0, eliminar de la lista
      if (product.quantity + quantity === 0) {
        const updateListCart = listCart.filter(
          (item) => item.id !== product.id
        );
        setListCart(updateListCart);

        //! Actualizar stock
        const updatedProducts = listProducts.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              stock: item.stock + Math.abs(quantity),
            };
          }
          return item;
        });

        setListProducts(updatedProducts);

        return;
      }

      //! Actualizar cantidad de producto
      const updatedProductsCart = listCart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });

      setListCart(updatedProductsCart);

      //! Actualizar stock
      const updatedProducts = listProducts.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            stock: item.stock - quantity,
          };
        }
        return item;
      });

      setListProducts(updatedProducts);
    } else {
      //! Actualizar stock
      const updatedProducts = listProducts.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            stock: item.stock - quantity,
          };
        }
        return item;
      });

      setListProducts(updatedProducts);
      setListCart([...listCart, product]);
    }
  };

  const handlePay = () => {
    setListCart([]);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="SignIn"
        children={() => <SignInScreen newUser={newUser} users={listUsers} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        children={() => <RegisterScreen users={listUsers} addUser={addUser} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        children={() => (
          <HomeScreen
            products={listProducts}
            wishlist={wishlist}
            setWishlist={(product) => handleWishlist(product)}
            cart={listCart}
            addCart={handleProducts}
          />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        children={() => (
          <CartScreen
            cart={listCart}
            addCart={handleCartScreen}
            products={listProducts}
            pay={handlePay}
          />
        )}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
