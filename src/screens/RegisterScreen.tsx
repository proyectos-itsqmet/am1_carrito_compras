import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../constants/AppColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CustomLabel } from "../components/CustomLabel";
import { CustomButton } from "../components/CustomButton";
import { CustomTextButton } from "../components/CustomTextButton";
import { CustomInputText } from "../components/CustomInputText";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../interfaces/User";
import { useNavigation } from "@react-navigation/native";

interface RegisterScreenProps {
  users: User[];
  addUser: (user: User) => void;
}

interface FormRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterScreen = ({ users, addUser }: RegisterScreenProps) => {
  const navigation = useNavigation();

  const [formRegister, setFormRegister] = useState<FormRegister>({
    name: "Yermain Paredes",
    phone: "0654987321",
    email: "yparedes@correo.com.ec",
    password: "123456",
    confirmPassword: "123456",
    // name: "",
    // phone: "",
    // email: "",
    // password: "",
    // confirmPassword: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] =
    useState<boolean>(true);

  const verifyUsername = (): User | undefined => {
    const existUsername = users.find(
      (user) => user.email === formRegister.email
    );

    return existUsername;
  };

  const getIdUser = (): number => {
    const getId = users.length + 1;
    return getId;
  };

  const handleRegister = () => {
    //! Nota: La validacion de los campos la hago en el boton de "Registrarse", si no estan completos el boton no se habilita
    if (verifyUsername() != undefined) {
      Alert.alert("Error", "El usuario ya existe");
      return;
    }

    const newUser: User = {
      id: getIdUser(),
      fullName: formRegister.name,
      phone: formRegister.phone,
      email: formRegister.email,
      password: formRegister.password,
    };

    addUser(newUser);

    Alert.alert("Exito!", "Usuario registrado con exito");

    navigation.goBack();
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
              value={formRegister.name}
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
              value={formRegister.phone}
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
              value={formRegister.email}
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
              value={formRegister.password}
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
              value={formRegister.confirmPassword}
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
            onPress={() => navigation.goBack()}
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
