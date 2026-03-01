import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useResponsive } from '@/hooks/use-responsive';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdminLogin() {
  const { s, fs } = useResponsive();
  const { isAdmin, login } = useAdminAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function onSubmit() {
    const ok = await login(password);
    if (ok) {
      router.replace('/admin/appointments');
    } else {
      setError('Mật khẩu không đúng');
    }
  }

  if (isAdmin) {
    router.replace('/admin/appointments');
    return null;
  }

  return (
    <ThemedView style={[styles.container, { gap: s(8), padding: s(12) }]}>
      <ThemedText type="title" style={{ fontSize: fs(27) }}>Đăng nhập quản trị</ThemedText>
      <ThemedText style={{ fontSize: fs(16) }}>Nhập mật khẩu quản trị để tiếp tục.</ThemedText>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { minHeight: s(44), borderRadius: s(6), padding: s(10) }]}
        placeholder="Mật khẩu"
      />
      {error ? <ThemedText style={{ color: 'red' }}>{error}</ThemedText> : null}
      <View style={[styles.actions, { gap: s(8), marginTop: s(12) }]}>
        <TouchableOpacity onPress={onSubmit} style={[styles.buttonPrimary, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(12) }]}>
          <ThemedText style={{ color: '#fff', fontSize: fs(16) }}>Đăng nhập</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 8, padding: 12 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 10, borderRadius: 6, minHeight: 44 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 12 },
  buttonPrimary: {
    minHeight: 44,
    backgroundColor: '#0a7ea4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
