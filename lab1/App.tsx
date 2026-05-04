import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { GalleryScreen } from './src/screens/GalleryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { Colors } from './src/styles/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName: any = route.name === 'Головна' ? 'newspaper' :
                    route.name === 'Галерея' ? 'images' : 'person-circle';
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: Colors.primary,
              headerStyle: { backgroundColor: Colors.lightGray },
            })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Галерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}