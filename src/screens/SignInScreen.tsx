import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../constants/AppColors";
import { globalStyles } from "../../styles/global-styles";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomInputText } from "../components/CustomInputText";
import { CustomButton } from "../components/CustomButton";
import { CustomTextButton } from "../components/CustomTextButton";
import { CustomLabel } from "../components/CustomLabel";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";

type Props = StackScreenProps<RootStackParams, "SignIn">;

interface FormLogin {
  email: string;
  password: string;
}

export const SignInScreen = ({ navigation }: Props) => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const handleLogin = () => {
    //! Nota: La validacion de los campos la hago en el boton de "Iniciar sesion", si no estan completos el boton no se habilita
    console.log(`SignIn: ${JSON.stringify(formLogin)}`);
  };

  return (
    <SafeAreaView style={loginScreentyles.container}>
      <View style={{ width: "100%" }}>
        <View style={{ gap: 5, marginBottom: 60 }}>
          <Text style={globalStyles.title}>Bienvenido de nuevo!</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "regular",
              color: AppColors.secondaryColor,
            }}
          >
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
              onChangeText={(prop, value) =>
                setFormLogin({ ...formLogin, [prop]: value })
              }
            />
          </View>
          <View>
            <CustomLabel title={"Contraseña"} />
            <CustomInputText
              placeholder={"Ingresa tu contraseña"}
              keyboardType="default"
              property="password"
              secureTextEntry={hiddenPassword}
              onChangeText={(prop, value) =>
                setFormLogin({ ...formLogin, [prop]: value })
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
            disabled={formLogin.email === "" || formLogin.password === ""}
          />
        </View>
      </View>
      <View style={loginScreentyles.registrarContainer}>
        <Text style={loginScreentyles.text}>¿No tienes una cuenta?</Text>
        <CustomTextButton
          title={"Registrate aquí"}
          onPress={() => navigation.navigate("Register")}
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
