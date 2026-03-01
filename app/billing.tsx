import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useResponsive } from '@/hooks/use-responsive';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Billing() {
  const { s, fs } = useResponsive();

  return (
    <ThemedView style={[styles.container, { gap: s(12), padding: s(12) }]}>
      <ThemedText type="title" style={{ fontSize: fs(27) }}>Thanh toán</ThemedText>
      <ThemedText style={{ fontSize: fs(16) }}>Quản lý hóa đơn và thanh toán ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
