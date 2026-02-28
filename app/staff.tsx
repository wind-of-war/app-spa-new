import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Staff() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Nhân viên</ThemedText>
      <ThemedText>Danh sách nhân viên và lịch làm việc sẽ xuất hiện ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
