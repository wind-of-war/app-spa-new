import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Billing() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Thanh toán</ThemedText>
      <ThemedText>Quản lý hóa đơn và thanh toán ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
