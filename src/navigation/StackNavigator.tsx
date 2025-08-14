import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "../screens/SignInScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { CartScreen } from "../screens/cart/CartScreen";
import { User } from "../interfaces/User";
import { users } from "../constants/Users";
import { FormLogin } from "../interfaces/FormLogin";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const [listUsers, setListUsers] = useState<User[]>(users);
  const [newUser, setNewUser] = useState<FormLogin | null>(null);

  const addUser = (user: User): void => {
    setListUsers([...listUsers, user]); //! Añadir nuevo usuario
    setNewUser({ email: user.email, password: user.password });
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
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
