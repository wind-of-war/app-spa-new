import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Clients() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Khách hàng</ThemedText>
      <ThemedText>Danh sách khách hàng sẽ hiển thị ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
