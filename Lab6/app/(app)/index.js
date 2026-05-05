import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Alert, ActivityIndicator, ScrollView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { router } from 'expo-router';

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Завантаження профілю з Firestore
    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                if (snap.exists()) {
                    const data = snap.data();
                    setName(data.name || '');
                    setAge(data.age || '');
                    setCity(data.city || '');
                }
            } catch (e) {
                Alert.alert('Помилка', 'Не вдалося завантажити профіль.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    // Збереження змін профілю
    const handleSave = async () => {
        if (!name.trim()) {
            return Alert.alert('Увага', "Поле «Ім'я» не може бути порожнім.");
        }
        setSaving(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), { name, age, city });
            Alert.alert('Збережено', 'Профіль успішно оновлено.');
        } catch (e) {
            Alert.alert('Помилка', 'Не вдалося зберегти зміни.');
        } finally {
            setSaving(false);
        }
    };

    // Видалення акаунта разом із документом Firestore
    const handleDeleteAccount = () => {
        Alert.alert(
            'Видалити акаунт',
            'Ви впевнені? Цю дію неможливо скасувати.',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'users', user.uid));
                            await deleteUser(auth.currentUser);
                            router.replace('/login');
                        } catch (e) {
                            Alert.alert('Помилка', 'Не вдалося видалити акаунт. Можливо, потрібно увійти знову.');
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0EA5A4" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
            {/* Шапка профілю */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {name ? name[0].toUpperCase() : user?.email?.[0]?.toUpperCase() || '?'}
                    </Text>
                </View>
                <Text style={styles.emailText}>{user?.email}</Text>
            </View>

            {/* Картка з полями */}
            <View style={styles.card}>
                <Text style={styles.sectionLabel}>Особисті дані</Text>

                <Text style={styles.fieldLabel}>Ім'я</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Введіть ім'я"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.fieldLabel}>Вік</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Введіть вік"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                <Text style={styles.fieldLabel}>Місто</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Введіть місто"
                    value={city}
                    onChangeText={setCity}
                />

                <TouchableOpacity
                    style={[styles.btnSave, saving && { opacity: 0.7 }]}
                    onPress={handleSave}
                    disabled={saving}
                    activeOpacity={0.85}
                >
                    {saving
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.btnText}>Зберегти зміни</Text>
                    }
                </TouchableOpacity>
            </View>

            {/* Кнопки виходу та видалення */}
            <TouchableOpacity style={styles.btnLogout} onPress={logout} activeOpacity={0.85}>
                <Text style={styles.btnLogoutText}>Вийти з акаунту</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnDelete} onPress={handleDeleteAccount} activeOpacity={0.85}>
                <Text style={styles.btnDeleteText}>Видалити акаунт</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F3FAFB',
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3FAFB',
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#0EA5A4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 4,
        shadowColor: '#0EA5A4',
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '800',
        color: '#fff',
    },
    emailText: {
        fontSize: 15,
        color: '#64748B',
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 22,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0B2545',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E6F6F5',
        borderRadius: 12,
        padding: 13,
        marginBottom: 14,
        fontSize: 15,
        color: '#0B2545',
    },
    btnSave: {
        backgroundColor: '#0EA5A4',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        marginTop: 4,
        elevation: 2,
    },
    btnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    btnLogout: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#0EA5A4',
        marginBottom: 12,
    },
    btnLogoutText: {
        color: '#0EA5A4',
        fontWeight: '700',
        fontSize: 15,
    },
    btnDelete: {
        backgroundColor: '#FEF2F2',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FCA5A5',
    },
    btnDeleteText: {
        color: '#DC2626',
        fontWeight: '700',
        fontSize: 15,
    },
});
