import { StyleSheet } from "react-native";
import { AppColors } from "../src/constants/AppColors";
import { AppSizes } from "../src/constants/AppSizes";

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderColor: AppColors.gray1,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: AppSizes.radiusXL,
    marginTop: 6,
  },
  inputLabel: {
    color: AppColors.mainColorText,
    fontSize: 16,
    fontWeight: "medium",
  },
  button: {
    backgroundColor: AppColors.mainColor,
    width: "100%",
    padding: 12,
    alignItems: "center",
    borderRadius: AppSizes.radiusXL,
  },
  buttonText: {
    color: "white",
    fontWeight: "medium",
    fontSize: 16,
  },
  linkText: {
    color: AppColors.mainColorText,
    textDecorationLine: "underline",
  },
  label: {
    fontSize: 12,
    color: AppColors.mainColorText,
    fontWeight: "medium",
  },
  title: {
    fontSize: 32,
    fontWeight: "semibold",
    color: AppColors.mainColorText,
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.gray1,
    marginVertical: 6,
  },
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: AppSizes.radiusXL,
    padding: 15,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "regular",
    color: AppColors.secondaryColor,
  },
});
