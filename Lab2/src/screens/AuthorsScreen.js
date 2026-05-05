import React from 'react';
import { View, Text, SectionList, StyleSheet, Image } from 'react-native';
import { authorsData } from '../data';

export default function AuthorsScreen() {
  return (
    <SectionList
      sections={authorsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: `https://picsum.photos/seed/author${item.id}/60` }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <View style={styles.groupBadge}>
              <Text style={styles.groupText}>{item.group}</Text>
            </View>
          </View>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Наші кухарі 👨‍🍳</Text>
          <Text style={styles.subheader}>ЖДТУ • Кафедра програмування</Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff8f0',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0c080',
  },
  header: {
    fontSize: 24, fontWeight: 'bold',
    color: '#e67e22',
  },
  subheader: {
    fontSize: 13, color: '#888', marginTop: 4,
  },
  sectionHeader: {
    backgroundColor: '#fdebd0',
    paddingHorizontal: 16, paddingVertical: 8,
    borderLeftWidth: 4, borderLeftColor: '#e67e22',
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#c0392b' },
  card: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: '#fff', gap: 14,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: '#e67e22' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#222' },
  specialty: { fontSize: 13, color: '#888', marginTop: 2 },
  groupBadge: {
    marginTop: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#eaf4fb',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  groupText: { fontSize: 12, color: '#2980b9', fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#f0e0cc', marginLeft: 82 },
});
