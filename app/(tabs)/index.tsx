import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <View style={styles.statIconBox}>
          <ThemedText style={styles.statIcon}>{icon}</ThemedText>
        </View>
        <View style={styles.percentTag}>
          <ThemedText style={styles.percentTagText}>0%</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
    </View>
  );
}

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const isPhone = width <= 430;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.heroRow}>
        <View>
          <ThemedText style={styles.microTitle}>CỔNG THÔNG TIN SERENITY</ThemedText>
          <ThemedText type="title" style={styles.title}>Tổng quan Sức khỏe</ThemedText>
          <ThemedText style={styles.subtitle}>Chào buổi sáng. Hệ thống spa của bạn đã sẵn sàng.</ThemedText>
        </View>

        <View style={[styles.statusPill, isPhone && styles.statusPillMobile]}>
          <View style={styles.dot} />
          <ThemedText style={styles.statusText}>Trạng thái: Trực tuyến</ThemedText>
        </View>
      </View>

      <View style={[styles.statRow, isPhone && styles.statRowMobile]}>
        <StatCard label="DOANH THU NGÀY" value="$0" icon="$" />
        <StatCard label="KHÁCH HÀNG MỚI" value="0" icon="◌" />
        <StatCard label="LỊCH HẸN HOẠT ĐỘNG" value="0" icon="☐" />
        <StatCard label="TỶ LỆ LẤP ĐẦY" value="0%" icon="↗" />
      </View>

      <View style={[styles.bottomRow, isPhone && styles.bottomRowMobile]}>
        <View style={[styles.flowCard, isPhone && styles.flowCardMobile]}>
          <View style={styles.flowHeader}>
            <View>
              <ThemedText style={styles.flowTitle}>Luồng Công việc</ThemedText>
              <ThemedText style={styles.flowSub}>Các liệu trình gần đây</ThemedText>
            </View>
            <TouchableOpacity style={styles.flowActionButton}>
              <ThemedText style={styles.flowAction}>Lịch trình →</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.flowEmpty}>
            <ThemedText style={styles.flowEmptyText}>Chưa có lịch hẹn nào được ghi nhận.</ThemedText>
          </View>
        </View>

        <View style={[styles.aiCard, isPhone && styles.aiCardMobile]}>
          <View style={styles.aiIcon}>
            <ThemedText style={styles.aiIconText}>✧</ThemedText>
          </View>
          <ThemedText style={styles.aiTitle}>Hài hòa AI</ThemedText>
          <ThemedText style={styles.aiSub}>
            Trí tuệ nhân tạo của chúng tôi đảm bảo spa của bạn luôn vận hành hoàn hảo.
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
  microTitle: { color: '#7aa99b', fontWeight: '700', letterSpacing: 1.2, fontSize: 18 },
  title: { color: '#3c7f6f', fontSize: 66 / 2, fontWeight: '700' },
  subtitle: { color: '#64748b', fontSize: 38 / 2, marginTop: 2 },
  statusPill: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
  },
  statusPillMobile: { width: '100%' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4f8b78' },
  statusText: { color: '#5b6f87', fontSize: 36 / 2, fontWeight: '500' },
  statRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  statRowMobile: { gap: 8 },
  statCard: {
    flex: 1,
    minWidth: 160,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ecf1f4',
    backgroundColor: '#fff',
    padding: 16,
    minHeight: 172,
  },
  statTop: { flexDirection: 'row', justifyContent: 'space-between' },
  statIconBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#edf5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: { fontSize: 36, color: '#4f8b78', fontWeight: '700' },
  percentTag: {
    borderRadius: 999,
    minWidth: 56,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef4f2',
  },
  percentTagText: { color: '#4f8b78', fontWeight: '700' },
  statLabel: { marginTop: 16, color: '#52657f', fontSize: 37 / 2, fontWeight: '500' },
  statValue: { marginTop: 2, color: '#4f8b78', fontSize: 68 / 2, fontWeight: '700' },
  bottomRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', flex: 1 },
  bottomRowMobile: { flex: 0 },
  flowCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ecf1f4',
    backgroundColor: '#fff',
    padding: 16,
    minHeight: 320,
  },
  flowCardMobile: { minHeight: 260 },
  flowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  flowTitle: { color: '#3c7f6f', fontWeight: '700', fontSize: 56 / 2 },
  flowSub: { color: '#73859b', fontSize: 35 / 2, marginTop: 2 },
  flowAction: { color: '#4f8b78', fontWeight: '600', fontSize: 33 / 2, marginTop: 8 },
  flowActionButton: {
    minHeight: 44,
    minWidth: 84,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  flowEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  flowEmptyText: { color: '#607089', fontSize: 39 / 2 },
  aiCard: {
    width: 360,
    minHeight: 320,
    borderRadius: 30,
    backgroundColor: '#4f8b78',
    padding: 16,
  },
  aiCardMobile: { width: '100%', minHeight: 240 },
  aiIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIconText: { color: '#f3e9d6', fontSize: 38 },
  aiTitle: { marginTop: 18, color: '#f8fafc', fontWeight: '700', fontSize: 64 / 2 },
  aiSub: { marginTop: 8, color: '#ddf4ec', fontSize: 37 / 2, lineHeight: 30 },
});
