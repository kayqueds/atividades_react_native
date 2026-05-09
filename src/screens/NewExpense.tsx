import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

import { useExpenses } from '@/components/expenses-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function NewExpenseScreen() {
  const router = useRouter();
  const { addExpense } = useExpenses();

  const pageBg = '#151718';
  const textColor = '#ECEDEE';

  const [description, setDescription] = useState('');
  const [amountText, setAmountText] = useState('');
  const [descError, setDescError] = useState('');
  const [amountError, setAmountError] = useState('');

  function handleSave() {
    const desc = description.trim();
    const parsed = parseFloat(amountText.replace(',', '.'));
    let hasError = false;

    if (!desc) {
      setDescError('Descrição é obrigatória');
      hasError = true;
    } else {
      setDescError('');
    }

    if (Number.isNaN(parsed) || parsed <= 0) {
      setAmountError('Valor deve ser maior que zero');
      hasError = true;
    } else {
      setAmountError('');
    }

    if (hasError) return;

    addExpense(desc, parsed);
    router.back();
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#151718' }] }>
      <ThemedText type="title" style={{ color: textColor }}>Novo gasto</ThemedText>

      <View style={styles.form}>
        <ThemedText style={{ color: textColor }}>Descrição</ThemedText>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Ex: Almoço"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        {descError ? <ThemedText style={styles.error}>{descError}</ThemedText> : null}

        <ThemedText style={[{ marginTop: 12, color: textColor }]}>Valor (R$)</ThemedText>
        <TextInput
          value={amountText}
          onChangeText={setAmountText}
          placeholder="Ex: 12.50"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          style={styles.input}
        />
        {amountError ? <ThemedText style={styles.error}>{amountError}</ThemedText> : null}

        <TouchableOpacity onPress={handleSave} style={[styles.saveButton, { backgroundColor: useThemeColor({}, 'primary') }]}> 
          <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>Salvar</ThemedText>
        </TouchableOpacity>

        <Link href="/" dismissTo style={styles.cancelLink}>
          <ThemedText type="link">Cancelar</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  form: { marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#444', padding: 10, borderRadius: 6, marginTop: 6, backgroundColor: '#222', color: '#fff' },
  saveButton: { marginTop: 18, padding: 12, alignItems: 'center', borderRadius: 6 },
  cancelLink: { marginTop: 12, alignItems: 'center' },
  error: { color: '#c0392b', marginTop: 6 },
});
