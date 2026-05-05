import React from 'react';
import {
    View, Text, FlatList, Image,
    TouchableOpacity, StyleSheet, Animated, Easing,
} from 'react-native';
import { Link, Stack } from 'expo-router';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

function ProductCard({ item }) {
    return (
        <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                    <Text style={styles.cardName} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.cardPrice}>${item.price}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default function CatalogScreen() {
    const { logout, currentUser } = useAuth();

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(18)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 420,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 420,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.headerBand} />
            <Stack.Screen options={{ headerShown: false }} />

            <Animated.View
                style={[
                    styles.content,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                {/* Шапка */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.eyebrow}>Каталог</Text>
                        <Text style={styles.title}>Актуальні гаджети</Text>
                        {currentUser && (
                            <Text style={styles.greeting}>Привіт, {currentUser.name}!</Text>
                        )}
                    </View>
                    <TouchableOpacity onPress={logout} style={styles.logoutBtn} activeOpacity={0.8}>
                        <Text style={styles.logoutText}>Вийти</Text>
                    </TouchableOpacity>
                </View>

                {/* Список товарів */}
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProductCard item={item} />}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#07131F',
    },
    headerBand: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 190,
        backgroundColor: '#0B2A3C',
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 52,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    eyebrow: {
        color: '#FDBA74',
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 2,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#F8FAFC',
    },
    greeting: {
        color: '#94A3B8',
        fontSize: 13,
        marginTop: 2,
    },
    logoutBtn: {
        backgroundColor: '#F97316',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 14,
    },
    list: {
        paddingBottom: 24,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F8FBFF',
        padding: 14,
        marginBottom: 12,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#DCE6EF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 14,
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    cardName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 6,
    },
    cardPrice: {
        color: '#F97316',
        fontSize: 16,
        fontWeight: '700',
    },
});
