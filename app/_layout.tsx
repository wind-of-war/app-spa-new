import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Link, Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

type NavItem = {
  label: string;
  to: '/(tabs)' | '/appointments' | '/clients' | '/services' | '/staff' | '/billing' | '/ai-assistant';
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Bảng điều khiển', to: '/(tabs)' },
  { label: 'Lịch hẹn', to: '/appointments' },
  { label: 'Khách hàng', to: '/clients' },
  { label: 'Dịch vụ', to: '/services' },
  { label: 'Nhân viên', to: '/staff' },
  { label: 'Thanh toán', to: '/billing' },
  { label: 'Trợ lý AI', to: '/ai-assistant' },
];

function Sidebar({ theme }: { theme: typeof Colors.light }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin } = useAdminAuth();

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandRow}>
        <View style={styles.brandLogo}>
          <Text style={styles.brandLogoText}>MS</Text>
        </View>
        <Text style={[styles.brandText, { color: '#3c7f6f' }]}>MySpa Flow</Text>
      </View>

      <View style={styles.navWrap}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.to || (item.to === '/(tabs)' && pathname === '/');
          return (
            <Link key={item.to} href={item.to} asChild>
              <TouchableOpacity style={[styles.navItem, active && styles.navItemActive]}>
                <Text style={[styles.navText, { color: active ? '#3c7f6f' : '#64748b' }]}>{item.label}</Text>
              </TouchableOpacity>
            </Link>
          );
        })}

        <TouchableOpacity
          style={styles.adminItem}
          onPress={() => {
            if (isAdmin) router.push('/admin/appointments');
            else router.push('/admin/login');
          }}>
          <Text style={[styles.navText, { color: '#64748b' }]}>{isAdmin ? 'Quản trị' : 'Đăng nhập quản trị'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsBox}>
        <View style={styles.settingsAvatar}>
          <Text style={styles.settingsAvatarText}>N</Text>
        </View>
        <Text style={styles.settingsText}>Cài đặt</Text>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isLarge = width >= 1024;
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: '#f8faf9' }]}
        edges={isLarge ? ['left', 'right'] : ['top', 'bottom', 'left', 'right']}>
        {isLarge ? <Sidebar theme={theme} /> : null}

        <View style={styles.mainShell}>
          <View style={[styles.topbar, !isLarge && styles.topbarMobile]}>
            <View />
            <View style={styles.profileWrap}>
              {isLarge ? (
                <View style={styles.profileTextBox}>
                  <Text style={styles.profileName}>Elena Rodriguez</Text>
                  <Text style={styles.profileRole}>Quản trị viên</Text>
                </View>
              ) : null}
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>ER</Text>
              </View>
            </View>
          </View>

          {!isLarge ? (
            <View style={styles.mobileNavRow}>
              {NAV_ITEMS.slice(0, 4).map((item) => (
                <Link key={item.to} href={item.to} asChild>
                  <TouchableOpacity style={styles.mobileNavItem}>
                    <Text style={styles.mobileNavText}>{item.label}</Text>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          ) : null}

          <View style={[styles.contentArea, !isLarge && styles.contentAreaMobile]}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  sidebar: {
    width: 300,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  brandRow: {
    minHeight: 86,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandLogo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#3c7f6f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogoText: { color: '#fff', fontWeight: '800', fontSize: 24 },
  brandText: { fontSize: 46 / 2, fontWeight: '700' },
  navWrap: { paddingTop: 18, paddingHorizontal: 12, gap: 8, flex: 1 },
  navItem: {
    minHeight: 58,
    borderRadius: 16,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  navItemActive: { backgroundColor: '#edf2f1' },
  navText: { fontSize: 32 / 2, fontWeight: '500' },
  adminItem: {
    minHeight: 50,
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  settingsBox: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    minHeight: 86,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsAvatarText: { color: '#fff', fontWeight: '600' },
  settingsText: { color: '#475569', fontSize: 29 / 2, fontWeight: '500' },
  mainShell: { flex: 1, backgroundColor: '#f8faf9' },
  topbar: {
    minHeight: 86,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  topbarMobile: {
    minHeight: 64,
    paddingHorizontal: 12,
  },
  profileWrap: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileTextBox: { alignItems: 'flex-end' },
  profileName: { fontSize: 37 / 2, fontWeight: '600', color: '#1f2937' },
  profileRole: { fontSize: 26 / 2, color: '#64748b', marginTop: 2 },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#d6e1db',
    backgroundColor: '#efe7d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: { fontSize: 34 / 2, fontWeight: '700', color: '#5b4630' },
  contentArea: { flex: 1, padding: 20 },
  contentAreaMobile: { padding: 12 },
  mobileNavRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  mobileNavItem: {
    minHeight: 44,
    minWidth: 72,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#edf2f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileNavText: { color: '#3c7f6f', fontSize: 12, fontWeight: '600' },
});
