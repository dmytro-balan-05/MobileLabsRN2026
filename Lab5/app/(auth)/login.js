import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, Animated, Easing,
    TouchableOpacity, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(24)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 480,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 480,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Увага', 'Введіть пошту та пароль');
            return;
        }

        const success = login(email.trim(), password);

        if (success) {
            router.replace('/');
        } else {
            Alert.alert(
                'Помилка входу',
                'Користувача не знайдено. Спочатку зареєструйтесь.'
            );
        }
    };

    return (
        <View style={styles.screen}>
            {}
            <View style={styles.circleBig} />
            <View style={styles.circleSmall} />

            <Animated.View
                style={[
                    styles.card,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                <Text style={styles.eyebrow}>Авторизація</Text>
                <Text style={styles.title}>Device Hub</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6B7280"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor="#6B7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.btn} onPress={handleLogin} activeOpacity={0.85}>
                    <Text style={styles.btnText}>Увійти</Text>
                </TouchableOpacity>

                <Link href="/register" style={styles.linkWrap}>
                    <Text style={styles.linkText}>Немає акаунту? Зареєструватись</Text>
                </Link>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#07131F',
    },
    circleBig: {
        position: 'absolute',
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: '#0B2A3C',
        top: -100,
        right: -100,
    },
    circleSmall: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#113A4A',
        bottom: -80,
        left: -70,
    },
    card: {
        backgroundColor: '#F4F7FB',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.22,
        shadowRadius: 20,
        elevation: 10,
    },
    eyebrow: {
        fontSize: 12,
        color: '#F97316',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 4,
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 22,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D4DEE7',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        fontSize: 15,
        color: '#111827',
    },
    btn: {
        backgroundColor: '#F97316',
        paddingVertical: 15,
        borderRadius: 14,
        marginTop: 6,
    },
    btnText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 16,
    },
    linkWrap: {
        marginTop: 18,
        alignSelf: 'center',
    },
    linkText: {
        color: '#0B5C73',
        fontSize: 14,
        fontWeight: '600',
    },
});
