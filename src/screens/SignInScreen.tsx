import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { AppColors } from "../constants/AppColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { globalStyles } from "../../styles/global-styles";

export const SignInScreen = () => {
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
            Bienvenido de nuevo!
          </Text>
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
          <View style={styles.recordarmeContainer}>
            <CustomCheckbox />
            <Text style={styles.text}>Recordarme</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={globalStyles.linkText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ ...globalStyles.button, marginTop: 100 }}
          onPress={() => {}}
        >
          <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registrarContainer}>
        <Text style={styles.text}>¿No tienes una cuenta?</Text>
        <TouchableOpacity>
          <Text style={globalStyles.linkText}>Regístrate aquí</Text>
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
  registrarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
