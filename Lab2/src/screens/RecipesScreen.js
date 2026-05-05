import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  StyleSheet, ActivityIndicator, TextInput,
} from 'react-native';
import { recipesData } from '../data';

export default function RecipesScreen({ navigation }) {
  const [data, setData] = useState(recipesData.slice(0, 12));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    : data;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(recipesData.slice(0, 12));
      setSearch('');
      setIsRefreshing(false);
    }, 1200);
  };

  const handleLoadMore = () => {
    if (data.length < recipesData.length && !search.trim()) {
      setData(prev => [...prev, ...recipesData.slice(prev.length, prev.length + 8)]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.tag}>{item.category}</Text>
          <Text style={styles.time}>⏱ {item.time}</Text>
        </View>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View>
          <Text style={styles.header}>Кулінарна книга 🍳</Text>
          <TextInput
            style={styles.search}
            placeholder="Пошук рецепту..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      }
      ListFooterComponent={
        !search.trim() && data.length < recipesData.length
          ? <ActivityIndicator size="large" color="#e67e22" style={{ margin: 16 }} />
          : <Text style={styles.footer}>— Усі рецепти завантажено —</Text>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      initialNumToRender={10}
      maxToRenderPerBatch={6}
      windowSize={5}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26, fontWeight: 'bold', padding: 16,
    textAlign: 'center', color: '#e67e22',
    backgroundColor: '#fff8f0',
  },
  search: {
    margin: 12, marginTop: 0,
    padding: 10, borderRadius: 10,
    borderWidth: 1, borderColor: '#f0c080',
    backgroundColor: '#fff', fontSize: 15,
  },
  card: {
    flexDirection: 'row', marginHorizontal: 12,
    borderRadius: 12, overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
  },
  image: { width: 80, height: 80 },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 15, color: '#222', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  tag: {
    fontSize: 11, color: '#e67e22',
    backgroundColor: '#fff3e0', paddingHorizontal: 7,
    paddingVertical: 2, borderRadius: 8,
  },
  time: { fontSize: 12, color: '#666' },
  rating: { fontSize: 13, color: '#f39c12' },
  separator: { height: 8 },
  footer: { padding: 20, textAlign: 'center', color: '#aaa', fontSize: 13 },
});
