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
        backgroundColor: '#F3FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    code: {
        fontSize: 80,
        fontWeight: '900',
        color: '#0EA5A4',
        lineHeight: 90,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0B2545',
        marginTop: 8,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 28,
    },
    link: {
        backgroundColor: '#0EA5A4',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 14,
    },
    linkText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 15,
    },
});
