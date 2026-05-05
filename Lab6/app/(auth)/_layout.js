import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F3FAFB' },
            }}
        >
            <Stack.Screen name="login" options={{ title: 'Вхід' }} />
            <Stack.Screen name="register" options={{ title: 'Реєстрація' }} />
        </Stack>
    );
}
