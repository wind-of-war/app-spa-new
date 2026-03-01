import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function Appointments() {
  const { width } = useWindowDimensions();
  const isPhone = width <= 430;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <ThemedText type="title" style={styles.title}>Lịch hẹn</ThemedText>
          <ThemedText style={styles.subtitle}>Quản lý luồng công việc và các phiên trị liệu.</ThemedText>
        </View>

        <View style={[styles.actions, isPhone && styles.actionsMobile]}>
          <TouchableOpacity style={[styles.filterButton, isPhone && styles.actionButtonMobile]}>
            <ThemedText style={styles.filterText}>Bộ lọc</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addButton, isPhone && styles.actionButtonMobile]}>
            <ThemedText style={styles.addText}>+ Đặt Lịch hẹn</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ThemedText style={styles.dateLabel}>Chủ Nhật, 1 tháng 3</ThemedText>

      <View style={styles.bodyRow}>
        <View style={[styles.calendarCard, isPhone && styles.calendarCardMobile]}>
          <ThemedText style={styles.calendarMonth}>Tháng Ba 2026</ThemedText>
          <View style={styles.calendarGrid}>
            <ThemedText style={styles.calendarLine}>Th Th Th Th Th Th CN</ThemedText>
            <ThemedText style={styles.calendarLine}>23 24 25 26 27 28 1</ThemedText>
            <ThemedText style={styles.calendarLine}>2 3 4 5 6 7 8</ThemedText>
            <ThemedText style={styles.calendarLine}>9 10 11 12 13 14 15</ThemedText>
            <ThemedText style={styles.calendarLine}>16 17 18 19 20 21 22</ThemedText>
            <ThemedText style={styles.calendarLine}>23 24 25 26 27 28 29</ThemedText>
            <ThemedText style={styles.calendarLine}>30 31 1 2 3 4 5</ThemedText>
          </View>
        </View>

        <View style={[styles.emptyCard, isPhone && styles.emptyCardMobile]}>
          <View style={styles.emptyIcon}>
            <ThemedText style={styles.emptyIconText}>◷</ThemedText>
          </View>
          <ThemedText style={styles.emptyTitle}>Ngày Yên tĩnh</ThemedText>
          <ThemedText style={styles.emptyText}>Chưa có liệu trình nào được lên lịch cho ngày này.</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 14 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
  title: { fontSize: 54 / 2, color: '#3c7f6f', fontWeight: '700' },
  subtitle: { marginTop: 2, color: '#64748b', fontSize: 19 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  actionsMobile: { width: '100%' },
  filterButton: {
    minHeight: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 22,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  filterText: { color: '#334155', fontSize: 18, fontWeight: '500' },
  addButton: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#4f8b78',
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  actionButtonMobile: { flex: 1 },
  dateLabel: { color: '#3c7f6f', fontWeight: '700', fontSize: 26 / 2 },
  bodyRow: { flex: 1, flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  calendarCard: {
    width: 300,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#edf1f5',
    padding: 18,
  },
  calendarCardMobile: {
    width: '100%',
    padding: 14,
  },
  calendarMonth: { textAlign: 'center', fontWeight: '500', color: '#1f2937', fontSize: 18, marginBottom: 10 },
  calendarGrid: { gap: 8 },
  calendarLine: { color: '#1f2937', fontSize: 18 },
  emptyCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 320,
    borderRadius: 26,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    gap: 8,
  },
  emptyCardMobile: {
    minHeight: 240,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: '#f1f5f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconText: { fontSize: 36, color: '#9fb8b0' },
  emptyTitle: { fontSize: 46 / 2, color: '#4f8b78', fontWeight: '700' },
  emptyText: { color: '#607089', fontSize: 37 / 2, textAlign: 'center', maxWidth: 420 },
});
