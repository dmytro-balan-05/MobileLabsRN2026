import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Сторінку не знайдено' }} />
            <View style={styles.screen}>
                <Text style={styles.code}>404</Text>
                <Text style={styles.title}>Сторінку не знайдено</Text>
                <Text style={styles.subtitle}>Такого маршруту не існує у застосунку.</Text>
                <Link href="/" style={styles.link}>
                    <Text style={styles.linkText}>Повернутись на головну</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#07131F',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    code: {
        fontSize: 80,
        fontWeight: '900',
        color: '#F97316',
        lineHeight: 90,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#F8FAFC',
        marginTop: 8,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 24,
    },
    link: {
        backgroundColor: '#F97316',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 14,
    },
    linkText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 15,
    },
});
