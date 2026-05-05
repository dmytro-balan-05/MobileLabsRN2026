import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { products } from '../../../data/products';

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <View style={styles.emptyScreen}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyTitle}>Товар не знайдено</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Повернутись</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: product.name,
                    headerShown: true,
                    headerStyle: { backgroundColor: '#0B2A3C' },
                    headerTintColor: '#F8FAFC',
                    headerTitleStyle: { fontWeight: '700', fontSize: 16 },
                }}
            />

            {/* Зображення товару */}
            <Image source={{ uri: product.image }} style={styles.image} />

            {/* Блок інформації */}
            <View style={styles.infoCard}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Ціна:</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>
                <View style={styles.divider} />
                <Text style={styles.descLabel}>Опис</Text>
                <Text style={styles.desc}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#07131F',
    },
    container: {
        paddingBottom: 30,
    },
    image: {
        width: '100%',
        height: 300,
    },
    infoCard: {
        marginTop: -20,
        marginHorizontal: 14,
        backgroundColor: '#F4F7FB',
        borderRadius: 22,
        padding: 20,
        borderWidth: 1,
        borderColor: '#DCE6EF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    name: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
    },
    priceLabel: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: '500',
    },
    price: {
        fontSize: 24,
        color: '#F97316',
        fontWeight: '800',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2EAF1',
        marginBottom: 14,
    },
    descLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    desc: {
        fontSize: 15,
        color: '#334155',
        lineHeight: 24,
    },
    emptyScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07131F',
        padding: 24,
        gap: 12,
    },
    emptyIcon: {
        fontSize: 48,
    },
    emptyTitle: {
        color: '#F8FAFC',
        fontSize: 20,
        fontWeight: '700',
    },
    backBtn: {
        backgroundColor: '#F97316',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 8,
    },
    backBtnText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 15,
    },
});
