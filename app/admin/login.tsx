import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdminLogin() {
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
    <ThemedView style={styles.container}>
      <ThemedText type="title">Đăng nhập quản trị</ThemedText>
      <ThemedText>Nhập mật khẩu quản trị để tiếp tục.</ThemedText>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Mật khẩu"
      />
      {error ? <ThemedText style={{ color: 'red' }}>{error}</ThemedText> : null}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onSubmit} style={styles.buttonPrimary}>
          <ThemedText style={{ color: '#fff' }}>Đăng nhập</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 8, padding: 12 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 8, borderRadius: 6 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 12 },
  buttonPrimary: { backgroundColor: '#0a7ea4', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
});
