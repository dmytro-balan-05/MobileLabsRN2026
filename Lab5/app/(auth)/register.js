import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, Animated, Easing,
    TouchableOpacity, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    // Анімація появи
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(24)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 520,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 520,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const validate = () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Помилка', 'Заповніть усі поля');
            return false;
        }
        if (!EMAIL_REGEX.test(email.trim())) {
            Alert.alert('Помилка', 'Некоректний формат email');
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Помилка', 'Пароль має бути від 6 символів');
            return false;
        }
        if (password !== confirmPass) {
            Alert.alert('Помилка', 'Паролі не збігаються');
            return false;
        }
        return true;
    };

    const handleRegister = () => {
        if (!validate()) return;
        register(email.trim(), password, name.trim());
        router.replace('/');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.topBar} />
            <View style={styles.bottomBar} />

            <Animated.View
                style={[
                    styles.card,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                <Text style={styles.eyebrow}>Новий акаунт</Text>
                <Text style={styles.title}>Реєстрація</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ім'я"
                    placeholderTextColor="#6B7280"
                    value={name}
                    onChangeText={setName}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Підтвердити пароль"
                    placeholderTextColor="#6B7280"
                    value={confirmPass}
                    onChangeText={setConfirmPass}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.btn} onPress={handleRegister} activeOpacity={0.85}>
                    <Text style={styles.btnText}>Створити акаунт</Text>
                </TouchableOpacity>

                <Link href="/login" style={styles.linkWrap}>
                    <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
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
        backgroundColor: '#061822',
    },
    topBar: {
        position: 'absolute',
        width: '140%',
        height: 170,
        backgroundColor: '#0B2A3C',
        top: -40,
        left: -40,
        borderBottomRightRadius: 130,
    },
    bottomBar: {
        position: 'absolute',
        width: '130%',
        height: 150,
        backgroundColor: '#0E3448',
        bottom: -40,
        right: -40,
        borderTopLeftRadius: 110,
    },
    card: {
        backgroundColor: '#F4F7FB',
        borderRadius: 24,
        padding: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 9,
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
        marginBottom: 18,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D4DEE7',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
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
        marginTop: 16,
        alignSelf: 'center',
    },
    linkText: {
        color: '#0B5C73',
        fontSize: 14,
        fontWeight: '600',
    },
});
