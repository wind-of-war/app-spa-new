import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function AiAssistant() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Trợ lý AI</ThemedText>
      <ThemedText>Trợ lý vận hành sẽ hỗ trợ tối ưu hóa hoạt động spa ở đây.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 8 },
});
