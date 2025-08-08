import { SafeAreaView } from "react-native-safe-area-context";
import { SignInScreen } from "./src/screens/SignInScreen";
import { globalStyles } from "./styles/global-styles";
import { RegisterScreen } from "./src/screens/RegisterScreen";

function App() {
  return (
    <SafeAreaView style={globalStyles.background}>
      {/* <SignInScreen /> */}
      <RegisterScreen />
    </SafeAreaView>
  );
}

export default App;
