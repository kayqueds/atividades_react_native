import React from 'react';
import { FlatList, StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useExpenses } from '@/components/expenses-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { expenses, removeExpense, total } = useExpenses();
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const success = useThemeColor({}, 'success');
  const router = useRouter();

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#151718' }]}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title" style={{ color: '#fff' }}>
            Caderneta de Gastos
          </ThemedText>
          <ThemedText type="subtitle" style={{ color: success }}>
            Total: R$ {total.toFixed(2)}
          </ThemedText>
        </View>
        <Pressable
          onPress={() => router.push('/modal')}
          style={({ hovered }) => [
            styles.addLink,
            { backgroundColor: secondary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', alignItems: 'center' },
            hovered ? { opacity: 0.85 } : null,
          ]}
        >
          <Ionicons name="add" size={18} color="#fff" style={{ marginRight: 6 }} />
          <ThemedText style={{ color: '#fff' }}>Adicionar</ThemedText>
        </Pressable>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<ThemedText style={{ color: primary }}>Nenhum gasto ainda.</ThemedText>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <ThemedText style={[styles.desc, { color: '#fff' }]}>{item.description}</ThemedText>
              <ThemedText style={{ color: '#fff' }}>R$ {item.amount.toFixed(2)}</ThemedText>
            </View>
            <Pressable
              onPress={() => removeExpense(item.id)}
              style={({ hovered }) => [
                styles.delete,
                hovered ? { backgroundColor: '#2a2a2a' } : null,
              ]}
            >
              <Ionicons name="trash" size={16} color="#fff" />
              <ThemedText style={{ color: '#fff', marginLeft: 8 }}>Excluir</ThemedText>
            </Pressable>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addLink: { padding: 8 },
  list: { paddingBottom: 40 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#333' },
  desc: { fontWeight: '600' },
  delete: { paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', borderRadius: 6 },
});
