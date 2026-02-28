import AppointmentItem from '@/components/appointments/appointment-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

type Appointment = { id: string; time: string; client: string; service: string; staff: string; status?: string };

export default function AdminAppointments() {
  const [list, setList] = useState<Appointment[]>([]);
  const router = useRouter();
  const { isAdmin } = useAdminAuth();

  useEffect(() => {
    if (isAdmin === false) {
      router.replace('/admin/login');
    }
  }, [isAdmin]);

  async function load() {
    try {
      const raw = await AsyncStorage.getItem('appointments');
      const parsed = raw ? (JSON.parse(raw) as Appointment[]) : [];
      setList(parsed);
    } catch (e) {
      setList([]);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, []);

  async function remove(id: string) {
    Alert.alert('Xóa lịch', 'Bạn có chắc muốn xóa lịch này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const raw = await AsyncStorage.getItem('appointments');
          const parsed = raw ? (JSON.parse(raw) as Appointment[]) : [];
          const next = parsed.filter((a) => a.id !== id);
          await AsyncStorage.setItem('appointments', JSON.stringify(next));
          setList(next);
        },
      },
    ]);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Quản trị Lịch hẹn</ThemedText>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => router.push('/add-appointment')} style={styles.buttonPrimary}>
          <ThemedText style={{ color: '#fff' }}>Thêm lịch mới</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <AppointmentItem appointment={item} />
            <View style={styles.rowActions}>
              <TouchableOpacity onPress={() => router.push({ pathname: '/edit-appointment', params: { id: item.id } })} style={styles.link}>
                <ThemedText>Chỉnh sửa</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item.id)} style={styles.linkDanger}>
                <ThemedText> Xóa</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 12 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  buttonPrimary: { backgroundColor: '#0a7ea4', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowActions: { flexDirection: 'row', gap: 8 },
  link: { padding: 8 },
  linkDanger: { padding: 8 },
});
