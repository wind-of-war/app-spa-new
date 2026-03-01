import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useResponsive } from '@/hooks/use-responsive';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Staff() {
  const { s, fs } = useResponsive();

  return (
    <ThemedView style={[styles.container, { gap: s(12), padding: s(12) }]}>
      <ThemedText type="title" style={{ fontSize: fs(27) }}>Nhân viên</ThemedText>
      <ThemedText style={{ fontSize: fs(16) }}>Danh sách nhân viên và lịch làm việc sẽ xuất hiện ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
