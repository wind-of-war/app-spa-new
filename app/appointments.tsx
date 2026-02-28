import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Appointments() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Lịch hẹn</ThemedText>
      <ThemedText>Trang danh sách lịch hẹn sẽ xuất hiện ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
