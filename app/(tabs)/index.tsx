import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useResponsive } from '@/hooks/use-responsive';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const { width, s, fs, isPhone } = useResponsive();
  const responsive = useMemo(() => {
    const baseWidth = 390;
    const rawScale = width / baseWidth;
    const scale = Math.min(1.2, Math.max(0.84, rawScale));

    return {
      scale,
      statCardMinHeight: s(132),
      statCardPadding: s(10),
      statIconSize: s(44),
      statIconRadius: s(12),
      statIconFont: s(20),
      badgeMinWidth: s(40),
      badgeMinHeight: s(26),
      badgeFont: s(12),
      labelFont: s(13),
      labelLineHeight: s(16),
      valueFont: s(24),
      valueLineHeight: s(28),
    };
  }, [s, width]);

  return (
    <ThemedView style={[styles.container, { gap: s(16) }]}>
      <View style={[styles.heroRow, { gap: s(12) }]}>
        <View>
          <ThemedText style={[styles.microTitle, { fontSize: fs(12) }]}>CỔNG THÔNG TIN SERENITY</ThemedText>
          <ThemedText type="title" style={[styles.title, { fontSize: fs(33) }]}>Tổng quan Sức khỏe</ThemedText>
          <ThemedText style={[styles.subtitle, { fontSize: fs(19) }]}>Chào buổi sáng. Hệ thống spa của bạn đã sẵn sàng.</ThemedText>
        </View>

        <View style={[styles.statusPill, isPhone && styles.statusPillMobile]}>
          <View style={styles.dot} />
          <ThemedText style={styles.statusText}>Trạng thái: Trực tuyến</ThemedText>
        </View>
      </View>

      <View style={[styles.statRow, isPhone && styles.statRowMobile, { gap: s(isPhone ? 8 : 12) }]}>
        <View
          style={[
            styles.statCard,
            isPhone && styles.statCardPhone,
            isPhone && { minHeight: responsive.statCardMinHeight, padding: responsive.statCardPadding },
          ]}>
          <View style={styles.statTop}>
            <View
              style={[
                styles.statIconBox,
                isPhone && styles.statIconBoxPhone,
                isPhone && {
                  width: responsive.statIconSize,
                  height: responsive.statIconSize,
                  borderRadius: responsive.statIconRadius,
                },
              ]}>
              <ThemedText style={[styles.statIcon, isPhone && styles.statIconPhone, isPhone && { fontSize: responsive.statIconFont }]}>
                $
              </ThemedText>
            </View>
            <View
              style={[
                styles.percentTag,
                isPhone && styles.percentTagPhone,
                isPhone && { minWidth: responsive.badgeMinWidth, minHeight: responsive.badgeMinHeight },
              ]}>
              <ThemedText style={[styles.percentTagText, isPhone && styles.percentTagTextPhone, isPhone && { fontSize: responsive.badgeFont }]}>
                0%
              </ThemedText>
            </View>
          </View>
          <ThemedText style={[styles.statLabel, isPhone && styles.statLabelPhone, isPhone && { fontSize: responsive.labelFont, lineHeight: responsive.labelLineHeight }]}>
            DOANH THU NGÀY
          </ThemedText>
          <ThemedText style={[styles.statValue, isPhone && styles.statValuePhone, isPhone && { fontSize: responsive.valueFont, lineHeight: responsive.valueLineHeight }]}>
            $0
          </ThemedText>
        </View>

        <View
          style={[
            styles.statCard,
            isPhone && styles.statCardPhone,
            isPhone && { minHeight: responsive.statCardMinHeight, padding: responsive.statCardPadding },
          ]}>
          <View style={styles.statTop}>
            <View
              style={[
                styles.statIconBox,
                isPhone && styles.statIconBoxPhone,
                isPhone && {
                  width: responsive.statIconSize,
                  height: responsive.statIconSize,
                  borderRadius: responsive.statIconRadius,
                },
              ]}>
              <ThemedText style={[styles.statIcon, isPhone && styles.statIconPhone, isPhone && { fontSize: responsive.statIconFont }]}>
                ◌
              </ThemedText>
            </View>
            <View
              style={[
                styles.percentTag,
                isPhone && styles.percentTagPhone,
                isPhone && { minWidth: responsive.badgeMinWidth, minHeight: responsive.badgeMinHeight },
              ]}>
              <ThemedText style={[styles.percentTagText, isPhone && styles.percentTagTextPhone, isPhone && { fontSize: responsive.badgeFont }]}>
                0%
              </ThemedText>
            </View>
          </View>
          <ThemedText style={[styles.statLabel, isPhone && styles.statLabelPhone, isPhone && { fontSize: responsive.labelFont, lineHeight: responsive.labelLineHeight }]}>
            KHÁCH HÀNG MỚI
          </ThemedText>
          <ThemedText style={[styles.statValue, isPhone && styles.statValuePhone, isPhone && { fontSize: responsive.valueFont, lineHeight: responsive.valueLineHeight }]}>
            0
          </ThemedText>
        </View>

        <View
          style={[
            styles.statCard,
            isPhone && styles.statCardPhone,
            isPhone && { minHeight: responsive.statCardMinHeight, padding: responsive.statCardPadding },
          ]}>
          <View style={styles.statTop}>
            <View
              style={[
                styles.statIconBox,
                isPhone && styles.statIconBoxPhone,
                isPhone && {
                  width: responsive.statIconSize,
                  height: responsive.statIconSize,
                  borderRadius: responsive.statIconRadius,
                },
              ]}>
              <ThemedText style={[styles.statIcon, isPhone && styles.statIconPhone, isPhone && { fontSize: responsive.statIconFont }]}>
                ☐
              </ThemedText>
            </View>
            <View
              style={[
                styles.percentTag,
                isPhone && styles.percentTagPhone,
                isPhone && { minWidth: responsive.badgeMinWidth, minHeight: responsive.badgeMinHeight },
              ]}>
              <ThemedText style={[styles.percentTagText, isPhone && styles.percentTagTextPhone, isPhone && { fontSize: responsive.badgeFont }]}>
                0%
              </ThemedText>
            </View>
          </View>
          <ThemedText style={[styles.statLabel, isPhone && styles.statLabelPhone, isPhone && { fontSize: responsive.labelFont, lineHeight: responsive.labelLineHeight }]}>
            LỊCH HẸN HOẠT ĐỘNG
          </ThemedText>
          <ThemedText style={[styles.statValue, isPhone && styles.statValuePhone, isPhone && { fontSize: responsive.valueFont, lineHeight: responsive.valueLineHeight }]}>
            0
          </ThemedText>
        </View>

        <View
          style={[
            styles.statCard,
            isPhone && styles.statCardPhone,
            isPhone && { minHeight: responsive.statCardMinHeight, padding: responsive.statCardPadding },
          ]}>
          <View style={styles.statTop}>
            <View
              style={[
                styles.statIconBox,
                isPhone && styles.statIconBoxPhone,
                isPhone && {
                  width: responsive.statIconSize,
                  height: responsive.statIconSize,
                  borderRadius: responsive.statIconRadius,
                },
              ]}>
              <ThemedText style={[styles.statIcon, isPhone && styles.statIconPhone, isPhone && { fontSize: responsive.statIconFont }]}>
                ↗
              </ThemedText>
            </View>
            <View
              style={[
                styles.percentTag,
                isPhone && styles.percentTagPhone,
                isPhone && { minWidth: responsive.badgeMinWidth, minHeight: responsive.badgeMinHeight },
              ]}>
              <ThemedText style={[styles.percentTagText, isPhone && styles.percentTagTextPhone, isPhone && { fontSize: responsive.badgeFont }]}>
                0%
              </ThemedText>
            </View>
          </View>
          <ThemedText style={[styles.statLabel, isPhone && styles.statLabelPhone, isPhone && { fontSize: responsive.labelFont, lineHeight: responsive.labelLineHeight }]}>
            TỶ LỆ LẤP ĐẦY
          </ThemedText>
          <ThemedText style={[styles.statValue, isPhone && styles.statValuePhone, isPhone && { fontSize: responsive.valueFont, lineHeight: responsive.valueLineHeight }]}>
            0%
          </ThemedText>
        </View>
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
  statRowMobile: { gap: 8, justifyContent: 'space-between' },
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
  statCardPhone: {
    flexBasis: '48%',
    flexGrow: 0,
    minWidth: 0,
    minHeight: 132,
    padding: 10,
    borderRadius: 16,
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
  statIconBoxPhone: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  statIcon: { fontSize: 36, color: '#4f8b78', fontWeight: '700' },
  statIconPhone: { fontSize: 20 },
  percentTag: {
    borderRadius: 999,
    minWidth: 56,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef4f2',
  },
  percentTagPhone: { minWidth: 40, minHeight: 26, paddingHorizontal: 6 },
  percentTagText: { color: '#4f8b78', fontWeight: '700' },
  percentTagTextPhone: { fontSize: 12 },
  statLabel: { marginTop: 16, color: '#52657f', fontSize: 37 / 2, fontWeight: '500' },
  statLabelPhone: { marginTop: 8, fontSize: 13, lineHeight: 16 },
  statValue: { marginTop: 2, color: '#4f8b78', fontSize: 68 / 2, fontWeight: '700' },
  statValuePhone: { marginTop: 0, fontSize: 24, lineHeight: 28 },
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
