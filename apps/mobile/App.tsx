/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useAlertStore } from './src/stores/alert.store';
import CustomAlert from './src/components/CustomAlert';
import AppStack from './src/navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { handleDeviceOnboarding } from './src/services/api';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useAuth } from './src/hooks/useAuth';

function App() {
  const getState = useAlertStore();
  const { user, setUser } = useAuth();
  const handleConfirm = () => {
    if (getState.onConfirm) {
      getState.onConfirm();
    }
    useAlertStore.getState().hideAlert();
  };

  const handleCancel = () => {
    if (getState.onCancel) {
      getState.onCancel();
    }
    useAlertStore.getState().hideAlert();
  };
  useEffect(() => {
    if (user) return;
    const onboardDevice = async () => {
      const deviceToken = await DeviceInfo.getUniqueId();
      const deviceType = Platform.OS;
      const response = await handleDeviceOnboarding(deviceToken, deviceType);
      setUser(response.user);
    };
    onboardDevice();
  }, [setUser, user]);

  return (
    <ImageBackground
      source={require('./assets/background_bg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>

        <Toast />
        <CustomAlert
          visible={getState.visible}
          title={getState.title}
          message={getState.message}
          confirmText={getState.confirmText}
          cancelText={getState.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          type={getState.type}
        />
      </SafeAreaProvider>
    </ImageBackground>
  );
}

export default App;
