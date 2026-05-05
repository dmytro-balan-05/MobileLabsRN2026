import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecipesScreen from './src/screens/RecipesScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import AuthorsScreen from './src/screens/AuthorsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://picsum.photos/seed/chef/100' }} style={styles.avatar} />
        <Text style={styles.name}>Дмитро Балан</Text>
        <Text style={styles.group}>Група ВТ-22-1</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function RecipesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Recipes" component={RecipesScreen} />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ headerShown: true, headerTintColor: '#e67e22' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#e67e22',
          drawerLabelStyle: { fontSize: 15 },
        }}
      >
        <Drawer.Screen name="Рецепти" component={RecipesStack} />
        <Drawer.Screen name="Автори" component={AuthorsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0c080',
    backgroundColor: '#fff8f0',
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, borderWidth: 2, borderColor: '#e67e22' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  group: { fontSize: 13, color: '#e67e22' },
});
