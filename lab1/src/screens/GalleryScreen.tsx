import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/theme';

const GALLERY_DATA = Array(12).fill(0).map((_, i) => ({ id: i.toString() }));

export const GalleryScreen = () => {
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <FlatList
                data={GALLERY_DATA}
                numColumns={2}
                keyExtractor={item => item.id}
                ListHeaderComponent={<Text style={globalStyles.screenTitle}>Фотогалерея</Text>}
                renderItem={() => <View style={globalStyles.galleryItem} />}
                contentContainerStyle={{ paddingHorizontal: 5 }}
            />
            <Text style={globalStyles.footerText}>Балан Дмитро Олегович ВТ-22-1</Text>
        </SafeAreaView>
    );
};