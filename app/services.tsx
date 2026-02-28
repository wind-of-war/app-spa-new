import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Services() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Dịch vụ</ThemedText>
      <ThemedText>Quản lý dịch vụ và giá sẽ nằm ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
