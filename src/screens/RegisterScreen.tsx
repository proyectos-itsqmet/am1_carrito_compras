import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../constants/AppColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CustomLabel } from "../components/CustomLabel";
import { CustomButton } from "../components/CustomButton";
import { CustomTextButton } from "../components/CustomTextButton";
import { CustomInputText } from "../components/CustomInputText";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";

type Props = StackScreenProps<RootStackParams, "Register">;

interface FormRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterScreen = ({ navigation }: Props) => {
  const [formRegister, setFormRegister] = useState<FormRegister>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] =
    useState<boolean>(true);

  const handleRegister = () => {
    //! Nota: La validacion de los campos la hago en el boton de "Registrarse", si no estan completos el boton no se habilita
    console.log(`Register: ${JSON.stringify(formRegister)}`);
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={registerScreenStyles.container}>
      <View style={{ width: "100%" }}>
        <View style={{ gap: 5, marginBottom: 60 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "semibold",
              color: AppColors.mainColorText,
            }}
          >
            Crea tu cuenta!
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "regular",
              color: AppColors.secondaryColor,
            }}
          >
            Regístrate para comenzar a comprar
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View>
            <CustomLabel title={"Nombre completo"} />
            <CustomInputText
              placeholder={"Ingresa tu nombre completo"}
              property={"name"}
              keyboardType={"default"}
              onChangeText={(prop, value) =>
                setFormRegister({ ...formRegister, [prop]: value })
              }
            />
          </View>
          <View>
            <CustomLabel title={"Celular"} />
            <CustomInputText
              placeholder={"Ingresa tu numero de celular"}
              property={"phone"}
              keyboardType={"default"}
              onChangeText={(prop, value) =>
                setFormRegister({ ...formRegister, [prop]: value })
              }
            />
          </View>
          <View>
            <CustomLabel title={"Email"} />
            <CustomInputText
              placeholder={"Ingresa tu email"}
              property={"email"}
              keyboardType={"default"}
              onChangeText={(prop, value) =>
                setFormRegister({ ...formRegister, [prop]: value })
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
                setFormRegister({ ...formRegister, [prop]: value })
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
          <View style={{ marginBottom: 50 }}>
            <CustomLabel title={"Confirmar Contraseña"} />
            <CustomInputText
              placeholder={"Confirma tu contraseña"}
              keyboardType="default"
              property="confirmPassword"
              secureTextEntry={hiddenConfirmPassword}
              onChangeText={(prop, value) =>
                setFormRegister({ ...formRegister, [prop]: value })
              }
              onPress={() => setHiddenConfirmPassword(!hiddenConfirmPassword)}
              suffixcon={
                <FontAwesome5
                  name={hiddenConfirmPassword ? "eye" : "eye-slash"}
                  size={18}
                  color={AppColors.gray2}
                />
              }
            />
            {formRegister.confirmPassword !== "" &&
              formRegister.password !== formRegister.confirmPassword && (
                <Text style={{ color: "red", fontSize: 14 }}>
                  Las contraseñas no coinciden
                </Text>
              )}
          </View>
        </View>
        <CustomButton
          title={"Registrarse"}
          onPress={handleRegister}
          disabled={
            formRegister.name === "" ||
            formRegister.phone === "" ||
            formRegister.email === "" ||
            formRegister.password === "" ||
            formRegister.confirmPassword === "" ||
            formRegister.password !== formRegister.confirmPassword
          }
        />
      </View>
      <View style={registerScreenStyles.registerContainer}>
        <Text style={registerScreenStyles.text}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity>
          <CustomTextButton
            title={"Inicia sesión"}
            onPress={() => navigation.navigate("SignIn")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const registerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 50,
  },
  text: {
    fontSize: 14,
    color: AppColors.secondaryColor,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
