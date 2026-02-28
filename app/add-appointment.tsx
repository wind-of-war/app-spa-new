import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddAppointment() {
  const router = useRouter();
  const [time, setTime] = useState('');
  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [staff, setStaff] = useState('');
  const [status, setStatus] = useState('Đang chờ');

  async function onSave() {
    if (!time || !client) return;
    try {
      const raw = await AsyncStorage.getItem('appointments');
      const list = raw ? (JSON.parse(raw) as any[]) : [];
      const id = `${Date.now()}`;
      const item = { id, time, client, service, staff, status };
      list.unshift(item);
      await AsyncStorage.setItem('appointments', JSON.stringify(list));
      router.back();
    } catch (e) {
      console.warn('Failed to save appointment', e);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Thêm lịch hẹn</ThemedText>

      <ThemedText>Thời gian</ThemedText>
      <TextInput value={time} onChangeText={setTime} style={styles.input} placeholder="10:00 AM" />

      <ThemedText>Khách hàng</ThemedText>
      <TextInput value={client} onChangeText={setClient} style={styles.input} placeholder="Tên khách" />

      <ThemedText>Dịch vụ</ThemedText>
      <TextInput value={service} onChangeText={setService} style={styles.input} placeholder="Dịch vụ" />

      <ThemedText>Nhân viên</ThemedText>
      <TextInput value={staff} onChangeText={setStaff} style={styles.input} placeholder="Nhân viên" />

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.back()} style={styles.buttonSecondary}>
          <ThemedText>Hủy</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={styles.buttonPrimary}>
          <ThemedText style={{ color: '#fff' }}>Lưu</ThemedText>
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
  buttonSecondary: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
});
