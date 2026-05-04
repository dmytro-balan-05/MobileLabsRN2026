import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/theme';
import { INewsItem } from '../types';

const MOCK_NEWS: INewsItem[] = Array(10).fill(0).map((_, i) => ({
    id: i.toString(),
    title: `Заголовок новини ${i + 1}`,
    date: '04.05.2026',
    description: 'Опис новин для Лабораторної Балан Дмитро ВТ-22-1'
}));

export const HomeScreen = () => {
    const renderItem = ({ item }: { item: INewsItem }) => (
        <View style={globalStyles.newsCard}>
            <Text style={globalStyles.newsTitle}>{item.title}</Text>
            <Text style={globalStyles.newsDate}>{item.date}</Text>
            <Text>{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <FlatList
                data={MOCK_NEWS}
                keyExtractor={item => item.id}
                ListHeaderComponent={<Text style={globalStyles.screenTitle}>Новини</Text>}
                renderItem={renderItem}
            />
            <Text style={globalStyles.footerText}>Балан Дмитро Олегович ВТ-22-1</Text>
        </SafeAreaView>
    );
};