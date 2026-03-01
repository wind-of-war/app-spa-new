import AppointmentItem from '@/components/appointments/appointment-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Appointment, deleteAppointment, getAppointments } from '@/src/utils/appointmentsStorage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AdminAppointments() {
  const [list, setList] = useState<Appointment[]>([]);
  const router = useRouter();
  const { isAdmin } = useAdminAuth();

  useEffect(() => {
    if (isAdmin === false) {
      router.replace('/admin/login');
    }
  }, [isAdmin, router]);

  async function load() {
    try {
      const parsed = await getAppointments();
      setList(parsed);
    } catch {
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
          const next = await deleteAppointment(id);
          setList(next);
        },
      },
    ]);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Quản trị lịch hẹn</ThemedText>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => router.push('/add-appointment')} style={styles.buttonPrimary}>
          <ThemedText style={{ color: '#fff' }}>Thêm lịch mới</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <AppointmentItem appointment={item} />
            <View style={styles.rowActions}>
              <TouchableOpacity
                onPress={() => router.push({ pathname: '/edit-appointment', params: { id: item.id } })}
                style={styles.link}>
                <ThemedText>Chỉnh sửa</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item.id)} style={styles.linkDanger}>
                <ThemedText>Xóa</ThemedText>
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
  buttonPrimary: {
    minHeight: 44,
    backgroundColor: '#0a7ea4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowActions: { flexDirection: 'row', gap: 8 },
  link: { minHeight: 44, minWidth: 44, paddingHorizontal: 10, justifyContent: 'center', borderRadius: 8 },
  linkDanger: { minHeight: 44, minWidth: 44, paddingHorizontal: 10, justifyContent: 'center', borderRadius: 8 },
});
