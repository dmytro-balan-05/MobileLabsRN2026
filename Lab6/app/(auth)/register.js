import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Link, router } from 'expo-router';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
    const { register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email.trim() || !password.trim()) {
            return Alert.alert('Помилка', 'Заповніть усі поля.');
        }
        if (!EMAIL_REGEX.test(email.trim())) {
            return Alert.alert('Помилка', 'Некоректний формат email.');
        }
        if (password.length < 6) {
            return Alert.alert('Помилка', 'Пароль має бути від 6 символів.');
        }
        if (password !== confirmPassword) {
            return Alert.alert('Помилка', 'Паролі не збігаються.');
        }

        setLoading(true);
        try {
            await register(email.trim(), password);
            router.replace('/');
        } catch (err) {
            const msg =
                err.code === 'auth/email-already-in-use'
                    ? 'Цей email вже використовується.'
                    : err.code === 'auth/weak-password'
                    ? 'Пароль занадто простий.'
                    : err.message;
            Alert.alert('Помилка реєстрації', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.title}>Реєстрація</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль (мін. 6 символів)"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Підтвердіть пароль"
                    placeholderTextColor="#94A3B8"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.btn, loading && styles.btnDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                    activeOpacity={0.85}
                >
                    {loading
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.btnText}>Створити акаунт</Text>
                    }
                </TouchableOpacity>

                <Link href="/login" asChild>
                    <TouchableOpacity style={styles.linkWrap}>
                        <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F3FAFB',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 28,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0B2545',
        marginBottom: 22,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2EAF1',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        fontSize: 15,
        color: '#0B2545',
    },
    btn: {
        backgroundColor: '#0EA5A4',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        marginTop: 6,
        elevation: 2,
    },
    btnDisabled: {
        opacity: 0.7,
    },
    btnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    linkWrap: {
        marginTop: 20,
        alignItems: 'center',
        padding: 8,
    },
    linkText: {
        color: '#6366F1',
        fontSize: 14,
        fontWeight: '600',
    },
});
