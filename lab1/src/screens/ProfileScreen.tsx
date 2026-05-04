import React from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/theme';

export const ProfileScreen = () => {
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <ScrollView contentContainerStyle={globalStyles.formGroup}>
                <Text style={globalStyles.screenTitle}>Реєстрація</Text>

                <Text style={globalStyles.label}>Електронна пошта</Text>
                <TextInput style={globalStyles.input} keyboardType="email-address" />

                <Text style={globalStyles.label}>Пароль</Text>
                <TextInput style={globalStyles.input} secureTextEntry />

                <Text style={globalStyles.label}>Пароль (ще раз)</Text>
                <TextInput style={globalStyles.input} secureTextEntry />

                <Text style={globalStyles.label}>Прізвище</Text>
                <TextInput style={globalStyles.input} />

                <Text style={globalStyles.label}>Ім'я</Text>
                <TextInput style={globalStyles.input} />

                <TouchableOpacity style={globalStyles.button}>
                    <Text style={globalStyles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>
            </ScrollView>
            <Text style={globalStyles.footerText}>Балан Дмитро Олегович ВТ-22-1</Text>
        </SafeAreaView>
    );
};