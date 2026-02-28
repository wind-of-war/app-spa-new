import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function Sidebar({ theme }: { theme: typeof Colors.light }) {
  const router = useRouter();
  const { isAdmin } = useAdminAuth();
  return (
    <View style={styles.sidebar}>
      <View style={styles.logoBox}>
        <Image
          source={{ uri: 'https://via.placeholder.com/48' }}
          style={styles.logo}
        />
        <Text style={[styles.brand, { color: theme.tint }]}>MSMySpa Flow</Text>
      </View>

      <ScrollView style={styles.nav} contentContainerStyle={{ paddingVertical: 8 }}>
        {(
          [
            { label: 'Bảng điều khiển', to: '/(tabs)' },
            { label: 'Lịch hẹn', to: '/appointments' },
            { label: 'Khách hàng', to: '/clients' },
            { label: 'Dịch vụ', to: '/services' },
            { label: 'Nhân viên', to: '/staff' },
            { label: 'Thanh toán', to: '/billing' },
          ] as const
        ).map((item) => (
          <Link key={item.to} href={item.to} asChild>
            <TouchableOpacity style={styles.navItem}>
              <Text style={[styles.navText, { color: theme.icon }]}>{item.label}</Text>
            </TouchableOpacity>
          </Link>
        ))}

        <TouchableOpacity
          style={[styles.navItem, { marginTop: 8 }]}
          onPress={() => {
            if (isAdmin) router.push('/admin/appointments');
            else router.push('/admin/login');
          }}>
          <Text style={[styles.navText, { color: theme.icon }]}>{isAdmin ? 'Quản trị' : 'Đăng nhập quản trị'}</Text>
        </TouchableOpacity>

        <Link key="ai" href="/ai-assistant" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={[styles.navText, { color: theme.icon }]}>Trợ lý AI</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>

      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.profileName, { color: theme.text }]}>Elena Rodriguez</Text>
          <Text style={[styles.profileRole, { color: theme.icon }]}>Quản trị viên</Text>
        </View>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isLarge = width >= 900;

  const { isAdmin, logout } = useAdminAuth();

  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {isLarge ? <Sidebar theme={theme} /> : null}

        <View style={[styles.main, !isLarge && styles.mainSmall]}>
          <View style={[styles.header, !isLarge && styles.headerSmall]}>
            <View>
              <Text style={[styles.greeting, { color: theme.text }]}>Chào buổi sáng, Elena.</Text>
              <Text style={[styles.sub, { color: theme.icon }]}>Spa hôm nay thật yên bình.</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Link href="/add-appointment" asChild>
                <TouchableOpacity style={[styles.secondaryButton, !isLarge && styles.aiButtonSmall]}>
                  <Text style={[styles.aiButtonText]}>Thêm lịch</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/ai-assistant" asChild>
                <TouchableOpacity style={[styles.aiButton, !isLarge && styles.aiButtonSmall, { backgroundColor: theme.tint }]}>
                  <Text style={[styles.aiButtonText, { color: theme.background }]}>Mở Trợ lý Vận hành</Text>
                </TouchableOpacity>
              </Link>
              {isAdmin ? (
                <>
                  <Text style={[{ marginLeft: 8, fontWeight: '600', color: theme.text }]}>Admin</Text>
                  <TouchableOpacity
                    onPress={() => logout()}
                    style={[styles.secondaryButton, { marginLeft: 4 }]}
                  >
                    <Text>Đăng xuất</Text>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </View>

          <View style={styles.content}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#fff' },
  sidebar: { width: 260, backgroundColor: '#0f172a', padding: 16, justifyContent: 'space-between' },
  logoBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 48, height: 48, borderRadius: 8, marginRight: 8 },
  brand: { color: '#fff', fontWeight: '700', fontSize: 16 },
  nav: { marginTop: 24 },
  navItem: { paddingVertical: 12, paddingHorizontal: 8, borderRadius: 8 },
  navText: { color: '#cbd5e1', fontSize: 15 },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  profileName: { color: '#fff', fontWeight: '600' },
  profileRole: { color: '#94a3b8', fontSize: 12 },
  main: { flex: 1, padding: 20 },
  mainSmall: { padding: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerSmall: { flexDirection: 'column', alignItems: 'flex-start', gap: 8 },
  greeting: { fontSize: 20, fontWeight: '700' },
  sub: { color: '#6b7280' },
  aiButton: { backgroundColor: '#111827', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  aiButtonSmall: { paddingVertical: 6, paddingHorizontal: 10 },
  aiButtonText: { color: '#fff' },
  secondaryButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  content: { flex: 1 },
});
