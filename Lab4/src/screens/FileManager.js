
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert, TouchableOpacity, Text, View, Modal, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import styled from 'styled-components/native';
import FileItem from '../components/FileItem';
import { formatBytes } from '../utils/formatters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Screen = styled.View`
    flex: 1;
    background-color: #f5f3ff;
    padding-top: ${props => props.top}px;
    padding-bottom: ${props => props.bottom}px;
`;
const Header = styled.View`
    background-color: #ffffff;
    padding: 16px;
    margin-horizontal: 15px;
    margin-top: 10px;
    border-radius: 18px;
    elevation: 4;
    shadow-color: #4c1d95;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.12;
    shadow-radius: 8px;
    border-width: 1px;
    border-color: #ddd6fe;
`;
const ModalOverlay = styled.View`flex: 1; background-color: rgba(30,27,75,0.45); justify-content: center; align-items: center;`;
const ModalContent = styled.View`width: 85%; background-color: #ffffff; padding: 25px; border-radius: 20px; elevation: 10; border-width: 1px; border-color: #ddd6fe;`;
const StyledInput = styled.TextInput`background-color: #f5f3ff; border-radius: 12px; padding: 15px; font-size: 16px; color: #1e1b4b; margin-top: 10px; border-width: 1px; border-color: #c4b5fd;`;
const ModalBtn = styled.TouchableOpacity`flex: 1; background-color: #7c3aed; padding: 15px; border-radius: 12px; align-items: center;`;
const FAB = styled.TouchableOpacity`
    background-color: #7c3aed;
    width: ${props => props.small ? '55px' : '75px'};
    height: ${props => props.small ? '55px' : '75px'};
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    elevation: 8;
`;
const DetailRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-vertical: 8px;
    border-bottom-width: 1px;
    border-bottom-color: #ede9fe;
`;

const Stat = ({ label, val, color }) => (
    <View>
        <Text style={{ fontSize: 9, color: '#a78bfa' }}>{label}</Text>
        <Text style={{ fontSize: 12, fontWeight: '700', color }}>{val}</Text>
    </View>
);

export default function NoteManager({ navigation }) {
    const insets = useSafeAreaInsets();
    const [currentDir, setCurrentDir] = useState(FileSystem.documentDirectory);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({ total: 0, free: 0 });

    // Модалка створення / перейменування
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const [isFolder, setIsFolder] = useState(false);

    // Модалка підтвердження видалення
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    // Модалка детальної інформації (п.6 завдання)
    const [detailVisible, setDetailVisible] = useState(false);
    const [detailItem, setDetailItem] = useState(null);

    const loadData = useCallback(async () => {
        if (!currentDir) return;
        try {
            const files = await FileSystem.readDirectoryAsync(currentDir);
            const details = await Promise.all(files.map(async (name) => {
                const info = await FileSystem.getInfoAsync(currentDir + name, { size: true });
                return { ...info, name };
            }));
            setItems(details.sort((a, b) => b.isDirectory - a.isDirectory));

            let free = 0; let total = 0;
            if (typeof FileSystem.getFreeDiskStorageAsync === 'function') free = await FileSystem.getFreeDiskStorageAsync();
            if (typeof FileSystem.getTotalDiskStorageAsync === 'function') total = await FileSystem.getTotalDiskStorageAsync();
            setStats({ total: total || (free + 5000000000), free });
        } catch (e) { console.log(e.message); }
    }, [currentDir]);

    useEffect(() => {
        loadData();
        const unsub = navigation.addListener('focus', loadData);
        return unsub;
    }, [navigation, loadData]);

    const handleConfirm = async () => {
        if (!inputValue.trim()) return;
        try {
            if (activeItem) {
                await FileSystem.moveAsync({ from: activeItem.uri, to: currentDir + inputValue });
            } else {
                if (isFolder) {
                    await FileSystem.makeDirectoryAsync(currentDir + inputValue, { intermediates: true });
                } else {
                    const fileName = inputValue.endsWith('.txt') ? inputValue : inputValue + '.txt';
                    navigation.navigate('Editor', { fileUri: currentDir + fileName, name: fileName });
                }
            }
            setModalVisible(false);
            setInputValue('');
            setActiveItem(null);
            loadData();
        } catch (e) { Alert.alert("Помилка", "Не вдалося виконати дію"); }
    };

    const handleDelete = async () => {
        if (!activeItem) return;
        try {
            await FileSystem.deleteAsync(activeItem.uri);
            setConfirmDeleteVisible(false);
            setActiveItem(null);
            loadData();
        } catch (e) { Alert.alert("Помилка", "Не вдалося видалити"); }
    };

    const goBackPath = () => {
        const parts = currentDir.split('/').filter(Boolean);
        if (parts.length <= 3) { setCurrentDir(FileSystem.documentDirectory); return; }
        parts.pop();
        const newPath = 'file:///' + parts.slice(1).join('/') + '/';
        setCurrentDir(newPath);
    };

    const showDetails = (item) => {
        setDetailItem(item);
        setDetailVisible(true);
    };

    const getFileType = (name, isDir) => {
        if (isDir) return 'Папка';
        const ext = name.includes('.') ? name.split('.').pop().toUpperCase() : '—';
        const types = { TXT: 'Текстовий файл', JS: 'JavaScript', JSON: 'JSON', MD: 'Markdown', PNG: 'Зображення PNG', JPG: 'Зображення JPEG' };
        return types[ext] || `Файл ${ext}`;
    };

    return (
        <Screen top={insets.top} bottom={insets.bottom}>

            {/* === МОДАЛКА 1: Створення / Перейменування === */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <Text style={{ fontWeight: '700', color: '#1e1b4b', marginBottom: 15, fontSize: 18 }}>
                            {activeItem ? '✏️ Перейменування' : (isFolder ? '📁 Нова категорія' : '📝 Нова нотатка')}
                        </Text>
                        <StyledInput
                            value={inputValue}
                            onChangeText={setInputValue}
                            autoFocus
                            placeholder="Назва..."
                            placeholderTextColor="#a5b4fc"
                        />
                        <View style={{ flexDirection: 'row', marginTop: 25, gap: 10 }}>
                            <ModalBtn onPress={() => { setModalVisible(false); setActiveItem(null); }} style={{ backgroundColor: '#ede9fe' }}>
                                <Text style={{ color: '#4c1d95', fontWeight: '600' }}>Скасувати</Text>
                            </ModalBtn>
                            <ModalBtn onPress={handleConfirm}>
                                <Text style={{ color: '#ffffff', fontWeight: '700' }}>Підтвердити</Text>
                            </ModalBtn>
                        </View>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* === МОДАЛКА 2: Підтвердження видалення === */}
            <Modal transparent visible={confirmDeleteVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <Text style={{ fontWeight: '700', color: '#be123c', marginBottom: 10, fontSize: 18 }}>🗑 Видалити?</Text>
                        <Text style={{ color: '#555', marginBottom: 20 }}>
                            Видалити «{activeItem?.name}»? Це незворотня дія.
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <ModalBtn onPress={() => setConfirmDeleteVisible(false)} style={{ backgroundColor: '#ede9fe' }}>
                                <Text style={{ color: '#4c1d95', fontWeight: '600' }}>Скасувати</Text>
                            </ModalBtn>
                            <ModalBtn onPress={handleDelete} style={{ backgroundColor: '#e11d48' }}>
                                <Text style={{ color: '#ffffff', fontWeight: '700' }}>Видалити</Text>
                            </ModalBtn>
                        </View>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* === МОДАЛКА 3: Детальна інформація про файл (п.6) === */}
            <Modal transparent visible={detailVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <Text style={{ fontWeight: '800', color: '#1e1b4b', marginBottom: 16, fontSize: 18 }}>
                            ℹ️ Інформація про об'єкт
                        </Text>
                        {detailItem && (
                            <View>
                                <DetailRow>
                                    <Text style={{ color: '#7c3aed', fontWeight: '600', fontSize: 13 }}>Назва</Text>
                                    <Text style={{ color: '#1e1b4b', fontSize: 13, maxWidth: '60%', textAlign: 'right' }} numberOfLines={2}>
                                        {detailItem.name}
                                    </Text>
                                </DetailRow>
                                <DetailRow>
                                    <Text style={{ color: '#7c3aed', fontWeight: '600', fontSize: 13 }}>Тип</Text>
                                    <Text style={{ color: '#1e1b4b', fontSize: 13 }}>
                                        {getFileType(detailItem.name, detailItem.isDirectory)}
                                    </Text>
                                </DetailRow>
                                <DetailRow>
                                    <Text style={{ color: '#7c3aed', fontWeight: '600', fontSize: 13 }}>Розмір</Text>
                                    <Text style={{ color: '#1e1b4b', fontSize: 13 }}>
                                        {detailItem.isDirectory ? '—' : formatBytes(detailItem.size)}
                                    </Text>
                                </DetailRow>
                                <DetailRow>
                                    <Text style={{ color: '#7c3aed', fontWeight: '600', fontSize: 13 }}>Дата зміни</Text>
                                    <Text style={{ color: '#1e1b4b', fontSize: 13 }}>
                                        {detailItem.modificationTime
                                            ? new Date(detailItem.modificationTime * 1000).toLocaleString('uk-UA')
                                            : '—'}
                                    </Text>
                                </DetailRow>
                                <DetailRow style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: '#7c3aed', fontWeight: '600', fontSize: 13 }}>Шлях</Text>
                                    <Text style={{ color: '#a78bfa', fontSize: 11, maxWidth: '60%', textAlign: 'right' }} numberOfLines={3}>
                                        {detailItem.uri?.replace(FileSystem.documentDirectory, 'нотатки/')}
                                    </Text>
                                </DetailRow>
                            </View>
                        )}
                        <TouchableOpacity
                            onPress={() => setDetailVisible(false)}
                            style={{ marginTop: 20, backgroundColor: '#7c3aed', padding: 14, borderRadius: 12, alignItems: 'center' }}
                        >
                            <Text style={{ color: '#fff', fontWeight: '700' }}>Закрити</Text>
                        </TouchableOpacity>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* === ЗАГОЛОВОК === */}
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: '#1e1b4b' }}>📓 Мій нотатник</Text>
                <Text style={{ fontSize: 12, color: '#7c3aed', marginTop: 2 }}>Дмитро Балан • ВТ-22-1 • ЖДТУ</Text>
            </View>

            {/* === СТАТИСТИКА ПАМ'ЯТІ (п.7) === */}
            <Header>
                <Text style={{ fontSize: 10, color: '#7c3aed', fontWeight: '700', letterSpacing: 1 }}>ПОТОЧНИЙ ШЛЯХ</Text>
                <Text numberOfLines={1} style={{ fontSize: 12, color: '#4c1d95', marginBottom: 10 }}>
                    {currentDir?.replace(FileSystem.documentDirectory, 'нотатки/') || 'нотатки/'}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#ddd6fe', paddingTop: 10 }}>
                    <Stat label="Всього" val={formatBytes(stats.total)} color="#4c1d95" />
                    <Stat label="Вільно" val={formatBytes(stats.free)} color="#059669" />
                    <Stat label="Зайнято" val={formatBytes(stats.total - stats.free)} color="#d97706" />
                </View>
            </Header>

            {/* === СПИСОК ФАЙЛІВ === */}
            <FlatList
                data={items}
                contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
                keyExtractor={(item) => item.uri}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 60 }}>
                        <Text style={{ fontSize: 48 }}>📭</Text>
                        <Text style={{ color: '#a5b4fc', fontSize: 15, marginTop: 10 }}>Тут ще немає нотаток</Text>
                    </View>
                }
                ListHeaderComponent={currentDir !== FileSystem.documentDirectory && (
                    <TouchableOpacity
                        onPress={goBackPath}
                        style={{ padding: 12, backgroundColor: '#ede9fe', borderRadius: 14, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#c4b5fd' }}
                    >
                        <Text style={{ color: '#4c1d95', fontWeight: '700' }}>← Повернутися вище</Text>
                    </TouchableOpacity>
                )}
                renderItem={({ item }) => (
                    <FileItem
                        item={item}
                        onPress={() => item.isDirectory
                            ? setCurrentDir(item.uri + '/')
                            : navigation.navigate('Editor', { fileUri: item.uri, name: item.name })}
                        onLongPress={() => {
                            Alert.alert(item.name, 'Оберіть дію:', [
                                { text: 'Скасувати', style: 'cancel' },
                                { text: 'ℹ️ Деталі', onPress: () => showDetails(item) },
                                { text: '✏️ Перейменувати', onPress: () => { setActiveItem(item); setInputValue(item.name); setModalVisible(true); } },
                                { text: '🗑 Видалити', style: 'destructive', onPress: () => { setActiveItem(item); setConfirmDeleteVisible(true); } },
                            ]);
                        }}
                    />
                )}
            />

            {/* === FAB КНОПКИ === */}
            <View style={{ position: 'absolute', bottom: insets.bottom + 20, right: 20, alignItems: 'center', gap: 12 }}>
                <FAB small style={{ backgroundColor: '#7c3aed' }} onPress={() => { setActiveItem(null); setIsFolder(true); setInputValue(''); setModalVisible(true); }}>
                    <Text style={{ fontSize: 18 }}>📁</Text>
                </FAB>
                <FAB onPress={() => { setActiveItem(null); setIsFolder(false); setInputValue(''); setModalVisible(true); }}>
                    <Text style={{ color: '#ffffff', fontSize: 35, lineHeight: 38 }}>+</Text>
                </FAB>
            </View>
        </Screen>
    );
}
