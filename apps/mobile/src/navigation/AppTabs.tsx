import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '../components/CustomTabBar';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Simple placeholder components for your views
const DummyScreen = ({ name }: { name: string }) => (
  <View className="flex-1 justify-center items-center bg-transparent">
    <Text className="text-xl font-bold text-slate-700">{name} Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" children={() => <HomeScreen />} />
      <Tab.Screen
        name="Leaderboard"
        children={() => <DummyScreen name="Leaderboard" />}
      />
      <Tab.Screen
        name="Notifications"
        children={() => <DummyScreen name="Notifications" />}
      />
      <Tab.Screen name="Profile" children={() => <ProfileScreen />} />
    </Tab.Navigator>
  );
}
