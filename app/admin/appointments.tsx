import AppointmentItem from '@/components/appointments/appointment-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useResponsive } from '@/hooks/use-responsive';
import { Appointment, deleteAppointment, getAppointments } from '@/src/utils/appointmentsStorage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AdminAppointments() {
  const { s, fs } = useResponsive();
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
    Alert.alert('XÃ³a lá»‹ch', 'Báº¡n cÃ³ cháº¯c muá»‘n xÃ³a lá»‹ch nÃ y?', [
      { text: 'Há»§y', style: 'cancel' },
      {
        text: 'XÃ³a',
        style: 'destructive',
        onPress: async () => {
          const next = await deleteAppointment(id);
          setList(next);
        },
      },
    ]);
  }

  return (
    <ThemedView style={[styles.container, { gap: s(12), padding: s(12) }]}>
      <ThemedText type="title" style={{ fontSize: fs(27) }}>Quáº£n trá»‹ lá»‹ch háº¹n</ThemedText>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => router.push('/add-appointment')} style={[styles.buttonPrimary, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(12) }]}>
          <ThemedText style={{ color: '#fff', fontSize: fs(16) }}>ThÃªm lá»‹ch má»›i</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <AppointmentItem appointment={item} />
            <View style={[styles.rowActions, { gap: s(8) }]}>
              <TouchableOpacity
                onPress={() => router.push({ pathname: '/edit-appointment', params: { id: item.id } })}
                style={[styles.link, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(10) }]}>
                <ThemedText>Chá»‰nh sá»­a</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item.id)} style={[styles.linkDanger, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(10) }]}>
                <ThemedText>XÃ³a</ThemedText>
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
