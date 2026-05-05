
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteManager from './src/screens/FileManager';
import NoteEditor from './src/screens/FileEditor';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: { backgroundColor: '#1e1b4b' },
                headerTintColor: '#e0e7ff',
                headerShown: false,
            }}>
                <Stack.Screen name="Manager" component={NoteManager} options={{ title: 'Мій Нотатник' }} />
                <Stack.Screen name="Editor" component={NoteEditor} options={{ title: 'Редактор нотатки' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
