import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export default function RecipeDetailScreen({ route, navigation }) {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.title,
      headerStyle: { backgroundColor: '#fff8f0' },
      headerTitleStyle: { color: '#e67e22', fontSize: 16 },
    });
  }, [navigation, item.title]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image source={{ uri: item.image.replace('/200', '/400') }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <Text style={styles.meta}>⏱ {item.time}</Text>
          <Text style={styles.meta}>⭐ {item.rating}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Про страву</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Інгредієнти</Text>
        {['Борошно — 200 г', 'Яйця — 2 шт', 'Молоко — 300 мл', 'Сіль — 1 ч.л.', 'Олія — 2 ст.л.'].map((ing, idx) => (
          <Text key={idx} style={styles.ingredient}>• {ing}</Text>
        ))}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Кроки приготування</Text>
        {[
          'Змішати всі сухі інгредієнти у мисці.',
          'Додати рідкі компоненти та ретельно перемішати.',
          'Залишити тісто на 15 хвилин.',
          'Приготувати на середньому вогні до золотистого кольору.',
          'Подати до столу гарячим з улюбленим соусом.',
        ].map((step, idx) => (
          <View key={idx} style={styles.stepRow}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>{idx + 1}</Text></View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 220 },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  badge: { backgroundColor: '#fff3e0', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: '#e67e22', fontSize: 13, fontWeight: '600' },
  meta: { fontSize: 14, color: '#555' },
  divider: { height: 1, backgroundColor: '#f0e0cc', marginVertical: 14 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#e67e22', marginBottom: 8 },
  desc: { fontSize: 15, color: '#444', lineHeight: 22 },
  ingredient: { fontSize: 14, color: '#333', paddingVertical: 3, paddingLeft: 4 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  stepNum: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#e67e22', alignItems: 'center', justifyContent: 'center',
  },
  stepNumText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  stepText: { flex: 1, fontSize: 14, color: '#333', lineHeight: 21, paddingTop: 3 },
});
