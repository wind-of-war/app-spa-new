import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditAppointment() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [time, setTime] = useState('');
  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [staff, setStaff] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function load() {
      if (!id) return;
      const raw = await AsyncStorage.getItem('appointments');
      const list = raw ? (JSON.parse(raw) as any[]) : [];
      const found = list.find((a) => String(a.id) === String(id));
      if (found) {
        setItem(found);
        setTime(found.time ?? '');
        setClient(found.client ?? '');
        setService(found.service ?? '');
        setStaff(found.staff ?? '');
        setStatus(found.status ?? '');
      }
    }

    load();
  }, [id]);

  async function onSave() {
    const raw = await AsyncStorage.getItem('appointments');
    const list = raw ? (JSON.parse(raw) as any[]) : [];
    const next = list.map((a) => (String(a.id) === String(id) ? { ...a, time, client, service, staff, status } : a));
    await AsyncStorage.setItem('appointments', JSON.stringify(next));
    router.back();
  }

  if (!item) return (
    <ThemedView style={styles.container}><ThemedText>Không tìm thấy lịch.</ThemedText></ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Chỉnh sửa lịch</ThemedText>

      <ThemedText>Thời gian</ThemedText>
      <TextInput value={time} onChangeText={setTime} style={styles.input} />

      <ThemedText>Khách hàng</ThemedText>
      <TextInput value={client} onChangeText={setClient} style={styles.input} />

      <ThemedText>Dịch vụ</ThemedText>
      <TextInput value={service} onChangeText={setService} style={styles.input} />

      <ThemedText>Nhân viên</ThemedText>
      <TextInput value={staff} onChangeText={setStaff} style={styles.input} />

      <ThemedText>Trạng thái</ThemedText>
      <TextInput value={status} onChangeText={setStatus} style={styles.input} />

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
