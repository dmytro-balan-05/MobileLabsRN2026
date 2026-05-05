import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Link, router } from 'expo-router';

export default function LoginScreen() {
    const { login, resetPassword } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            return Alert.alert('Увага', 'Заповніть усі поля.');
        }

        setLoading(true);
        try {
            await login(email.trim(), password);
            router.replace('/');
        } catch (err) {
            const msg =
                err.code === 'auth/invalid-credential'
                    ? 'Невірний email або пароль.'
                    : err.code === 'auth/user-not-found'
                    ? 'Користувача з такою поштою не знайдено.'
                    : err.code === 'auth/too-many-requests'
                    ? 'Забагато спроб. Спробуйте пізніше.'
                    : 'Не вдалося увійти. Перевірте дані.';
            Alert.alert('Помилка входу', msg);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            return Alert.alert('Увага', 'Введіть email, щоб отримати лист для відновлення пароля.');
        }
        try {
            await resetPassword(email.trim());
            Alert.alert('Успіх', 'Інструкцію для зміни пароля надіслано на вашу пошту.');
        } catch {
            Alert.alert('Помилка', 'Не вдалося надіслати лист. Перевірте email.');
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.title}>Вхід</Text>

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
                    placeholder="Пароль"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.btn, loading && styles.btnDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                    activeOpacity={0.85}
                >
                    {loading
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.btnText}>Увійти</Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotWrap}>
                    <Text style={styles.forgotText}>Забули пароль?</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Немає акаунту? </Text>
                    <Link href="/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Реєстрація</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F3FAFB',
        justifyContent: 'center',
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
        textAlign: 'center',
        marginBottom: 22,
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
    forgotWrap: {
        marginTop: 14,
        alignItems: 'center',
    },
    forgotText: {
        color: '#6366F1',
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    footerText: {
        color: '#64748B',
        fontSize: 14,
    },
    footerLink: {
        color: '#6366F1',
        fontWeight: '700',
        fontSize: 14,
    },
});
