import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppColors } from "../constants/AppColors";
import { globalStyles } from "../../styles/global-styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const RegisterScreen = () => {
  return (
    <View style={styles.container}>
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
            <Text style={{ ...globalStyles.label, paddingLeft: 4 }}>
              Nombre completo
            </Text>
            <View style={globalStyles.inputContainer}>
              <TextInput
                placeholder="Ingresa tu nombre completo"
                style={globalStyles.inputLabel}
              />
            </View>
          </View>
          <View>
            <Text style={{ ...globalStyles.label, paddingLeft: 4 }}>
              Celular
            </Text>
            <View style={globalStyles.inputContainer}>
              <TextInput
                placeholder="Ingresa tu numero de celular"
                style={globalStyles.inputLabel}
              />
            </View>
          </View>
          <View>
            <Text style={{ ...globalStyles.label, paddingLeft: 4 }}>Email</Text>
            <View style={globalStyles.inputContainer}>
              <TextInput
                placeholder="Ingresa tu email"
                style={globalStyles.inputLabel}
              />
            </View>
          </View>
          <View>
            <Text style={{ ...globalStyles.label, paddingLeft: 4 }}>
              Contraseña
            </Text>
            <View style={globalStyles.inputContainer}>
              <TextInput
                placeholder="Ingresa tu contraseña"
                style={globalStyles.inputLabel}
              />
              <TouchableOpacity>
                <FontAwesome5
                  name="eye-slash"
                  size={18}
                  color={AppColors.gray2}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{ ...globalStyles.label, paddingLeft: 4 }}>
              Confirmar Contraseña
            </Text>
            <View style={globalStyles.inputContainer}>
              <TextInput
                placeholder="Confirma tu contraseña"
                style={globalStyles.inputLabel}
              />
              <TouchableOpacity>
                <FontAwesome5
                  name="eye-slash"
                  size={18}
                  color={AppColors.gray2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ ...globalStyles.button, marginTop: 50 }}
          onPress={() => {}}
        >
          <Text style={globalStyles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iniciarSesionContainer}>
        <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity>
          <Text style={globalStyles.linkText}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 50,
  },
  recordarmeContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 10,
  },
  text: {
    fontSize: 14,
    color: AppColors.secondaryColor,
  },
  iniciarSesionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
