import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { globalStyles } from "../../../../styles/global-styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppColors } from "../../../constants/AppColors";
import { useNavigation } from "@react-navigation/core";

interface Props {
  visible: boolean;
  setShowModal: () => void;
  pay: () => void;
}

export const CheckoutModal = ({ visible, setShowModal, pay }: Props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={globalStyles.containerModal}>
        <View style={{ ...globalStyles.modal, width: width * 0.8 }}>
          <AntDesign
            name="checkcircle"
            size={120}
            color={AppColors.success}
            style={{ marginVertical: 24 }}
          />
          <Text style={globalStyles.title}>Alerta</Text>
          <Text style={globalStyles.description}>
            Compra realizada con exito
          </Text>
          <TouchableOpacity
            style={{ ...globalStyles.button, marginVertical: 24 }}
            onPress={() => {
              setShowModal();
              pay();
              navigation.goBack();
            }}
          >
            <Text style={globalStyles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
