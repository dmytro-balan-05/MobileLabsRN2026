import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GameProvider } from './src/GameContext';
import HomeScreen from './src/screens/HomeScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';

const Tab = createBottomTabNavigator();

const lightTheme = {
  background: '#f0f4ff',
  card: '#ffffff',
  text: '#1a1a2e',
  accent: '#6c63ff',
  subtext: '#555577',
};

const darkTheme = {
  background: '#0d0d1a',
  card: '#1a1a2e',
  text: '#e0e0ff',
  accent: '#a29bfe',
  subtext: '#9999bb',
};

export default function App() {
  const scheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: scheme === 'dark' ? '#1a1a2e' : '#ffffff',
                  borderTopColor: '#6c63ff33',
                },
                tabBarActiveTintColor: '#6c63ff',
                tabBarInactiveTintColor: '#aaa',
              }}
            >
              <Tab.Screen name="🚀 Дослідник" component={HomeScreen} />
              <Tab.Screen name="🎯 Місії" component={ChallengesScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </GameProvider>
    </GestureHandlerRootView>
  );
}
