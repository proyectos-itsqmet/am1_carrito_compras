import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppColors } from "../constants/AppColors";
import { globalStyles } from "../../styles/global-styles";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomInputText } from "../components/CustomInputText";
import { CustomButton } from "../components/CustomButton";
import { CustomTextButton } from "../components/CustomTextButton";
import { CustomLabel } from "../components/CustomLabel";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { User } from "../interfaces/User";
import { FormLogin } from "../interfaces/FormLogin";

interface SignInScreenProps {
  newUser: FormLogin | null;
  users: User[];
}

export const SignInScreen = ({ newUser, users }: SignInScreenProps) => {
  const navigation = useNavigation();

  const [formSignIn, setFormSignIn] = useState<FormLogin>({
    email: "garaque@correo.com.ec",
    password: "123456",
  });

  useEffect(() => {
    if (newUser) {
      setFormSignIn({
        email: newUser.email,
        password: newUser.password,
      });
    }
  }, [newUser]);

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const veriftyUser = (): User | undefined => {
    const existUser = users.find(
      (user) =>
        user.email === formSignIn.email && user.password === formSignIn.password
    );

    return existUser;
  };

  const handleLogin = () => {
    if (veriftyUser() === undefined) {
      Alert.alert("Alerta!", "Usuario o contraseña incorrectos");
      return;
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <SafeAreaView style={loginScreentyles.container}>
      <View style={{ width: "100%" }}>
        <View style={{ gap: 5, marginBottom: 60 }}>
          <Text style={globalStyles.title}>Bienvenido de nuevo!</Text>
          <Text style={globalStyles.description}>
            Inicia sesión con tu cuenta
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View>
            <CustomLabel title={"Email"} />
            <CustomInputText
              placeholder={"Ingresa tu email"}
              property={"email"}
              keyboardType={"default"}
              value={formSignIn.email}
              onChangeText={(prop, value) =>
                setFormSignIn({ ...formSignIn, [prop]: value })
              }
            />
          </View>
          <View>
            <CustomLabel title={"Contraseña"} />
            <CustomInputText
              placeholder={"Ingresa tu contraseña"}
              keyboardType="default"
              property="password"
              value={formSignIn.password}
              secureTextEntry={hiddenPassword}
              onChangeText={(prop, value) =>
                setFormSignIn({ ...formSignIn, [prop]: value })
              }
              onPress={() => setHiddenPassword(!hiddenPassword)}
              suffixcon={
                <FontAwesome5
                  name={hiddenPassword ? "eye" : "eye-slash"}
                  size={18}
                  color={AppColors.gray2}
                />
              }
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 16,
          }}
        >
          <View style={loginScreentyles.recordarmeContainer}>
            <CustomCheckbox />
            <Text style={loginScreentyles.text}>Recordarme</Text>
          </View>
          <View>
            <CustomTextButton title={"¿Olvidaste tu contraseña?"} />
          </View>
        </View>
        <View style={{ marginTop: 100 }}>
          <CustomButton
            title={"Iniciar sesión"}
            onPress={handleLogin}
            disabled={formSignIn.email === "" || formSignIn.password === ""}
          />
        </View>
      </View>
      <View style={loginScreentyles.registrarContainer}>
        <Text style={loginScreentyles.text}>¿No tienes una cuenta?</Text>
        <CustomTextButton
          title={"Registrate aquí"}
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: "Register" }))
          }
        />
      </View>
    </SafeAreaView>
  );
};

const loginScreentyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 50,
  },
  recordarmeContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: AppColors.secondaryColor,
  },
  registrarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
