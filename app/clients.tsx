import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useResponsive } from '@/hooks/use-responsive';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Clients() {
  const [query, setQuery] = useState('');
  const isEmpty = useMemo(() => query.trim().length >= 0, [query]);
  const { isPhone, s, fs } = useResponsive();

  return (
    <ThemedView style={[styles.container, { gap: s(16) }]}>
      <View style={styles.headerRow}>
        <View>
          <ThemedText type="title" style={[styles.title, { fontSize: fs(27) }]}>Khách hàng</ThemedText>
          <ThemedText style={[styles.subtitle, { fontSize: fs(16) }]}>Quản lý hồ sơ khách hàng và lịch sử dịch vụ.</ThemedText>
        </View>
        <TouchableOpacity style={[styles.addButton, isPhone && styles.addButtonMobile, { paddingHorizontal: s(22) }]}>
          <ThemedText style={[styles.addButtonText, { fontSize: fs(18) }]}>+ Khách hàng Mới</ThemedText>
        </TouchableOpacity>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm theo tên, email hoặc số điện thoại..."
        placeholderTextColor="#748297"
        style={[styles.searchInput, { minHeight: s(62), borderRadius: s(18), paddingHorizontal: s(18), fontSize: fs(18) }]}
      />

      <View style={[styles.emptyCard, { minHeight: s(320), borderRadius: s(24), paddingHorizontal: s(16) }]}>
        <View style={styles.emptyIcon}>
          <ThemedText style={[styles.emptyIconText, { fontSize: fs(36) }]}>◌</ThemedText>
        </View>
        <ThemedText style={[styles.emptyText, { fontSize: fs(19) }]}>
          {isEmpty ? 'Chưa có khách hàng nào trong hệ thống.' : 'Không có khách hàng phù hợp.'}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  title: { fontSize: 54 / 2, color: '#3c7f6f', fontWeight: '700' },
  subtitle: { marginTop: 2, color: '#64748b', fontSize: 19 },
  addButton: {
    minHeight: 44,
    backgroundColor: '#4f8b78',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 22,
    minWidth: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonMobile: {
    width: '100%',
    minWidth: 0,
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 18 },
  searchInput: {
    minHeight: 62,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 18,
    fontSize: 18,
    color: '#334155',
  },
  emptyCard: {
    flex: 1,
    minHeight: 320,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyIconText: { color: '#cbd5e1', fontSize: 36 },
  emptyText: { color: '#607089', fontSize: 38 / 2, textAlign: 'center' },
});
