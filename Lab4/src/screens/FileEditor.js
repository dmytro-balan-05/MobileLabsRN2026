
import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
    flex: 1;
    background-color: #f5f3ff;
    padding: 20px;
    padding-top: ${props => Math.max(props.top, 20)}px;
    padding-bottom: ${props => props.bottom + 10}px;
`;

export default function NoteEditor({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { fileUri, name } = route.params;
    const [content, setContent] = useState('');
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const info = await FileSystem.getInfoAsync(fileUri);
                if (info.exists) {
                    const text = await FileSystem.readAsStringAsync(fileUri);
                    setContent(text);
                    setCharCount(text.length);
                }
            } catch (e) { console.log("Новий файл"); }
        })();
    }, [fileUri]);

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(fileUri, content);
            Alert.alert('✅ Збережено', 'Нотатку успішно збережено!');
            navigation.goBack();
        } catch (e) { Alert.alert("Помилка", "Не вдалося зберегти файл"); }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Container top={insets.top} bottom={insets.bottom}>

                {/* Заголовок */}
                <View style={{ marginBottom: 6 }}>
                    <Text style={{ color: '#1e1b4b', fontWeight: '800', fontSize: 20 }} numberOfLines={1}>
                        📝 {name}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#7c3aed', marginTop: 2 }}>
                        Дмитро Балан • ВТ-22-1 • ЖДТУ
                    </Text>
                </View>

                {/* Лічильник символів */}
                <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
                    <Text style={{ fontSize: 11, color: '#a78bfa' }}>{charCount} символів</Text>
                </View>

                {/* Текстове поле */}
                <TextInput
                    multiline
                    style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderRadius: 18,
                        padding: 18,
                        textAlignVertical: 'top',
                        borderWidth: 1,
                        borderColor: '#c4b5fd',
                        fontSize: 16,
                        elevation: 2,
                        color: '#1e1b4b',
                        lineHeight: 24,
                    }}
                    value={content}
                    onChangeText={(text) => { setContent(text); setCharCount(text.length); }}
                    placeholder="Введіть текст нотатки..."
                    placeholderTextColor="#a78bfa"
                />

                {/* Кнопки */}
                <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
                    <Btn onPress={() => navigation.goBack()} style={{ backgroundColor: '#ede9fe', flex: 1 }}>
                        <Text style={{ color: '#4c1d95', fontWeight: '700' }}>← Назад</Text>
                    </Btn>
                    <Btn onPress={handleSave} style={{ flex: 2 }}>
                        <Text style={{ color: '#ffffff', fontWeight: '700' }}>💾 Зберегти</Text>
                    </Btn>
                </View>
            </Container>
        </KeyboardAvoidingView>
    );
}

const Btn = styled.TouchableOpacity`
    background-color: #7c3aed;
    padding: 16px;
    border-radius: 14px;
    align-items: center;
    elevation: 3;
`;
