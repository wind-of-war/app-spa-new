import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useResponsive } from '@/hooks/use-responsive';
import { getAppointments, updateAppointment } from '@/src/utils/appointmentsStorage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Appointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  staff: string;
  status: string;
};

export default function EditAppointment() {
  const { s, fs } = useResponsive();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState<Appointment | null>(null);
  const [time, setTime] = useState('');
  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [staff, setStaff] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function load() {
      if (!id) return;
      const list = await getAppointments();
      const found = list.find((appointment) => String(appointment.id) === String(id));
      if (found) {
        setItem(found);
        setTime(found.time);
        setClient(found.client);
        setService(found.service);
        setStaff(found.staff);
        setStatus(found.status);
      }
    }

    load();
  }, [id]);

  async function onSave() {
    if (!id) return;
    await updateAppointment(String(id), { time, client, service, staff, status });
    router.back();
  }

  if (!item) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>KhÃ´ng tÃ¬m tháº¥y lá»‹ch.</ThemedText>
      </ThemedView>
    );
  }

  const inputStyle = [styles.input, { minHeight: s(44), borderRadius: s(6), padding: s(10) }];

  return (
    <ThemedView style={[styles.container, { gap: s(8), padding: s(12) }]}>
      <ThemedText type="title" style={{ fontSize: fs(27) }}>Chá»‰nh sá»­a lá»‹ch</ThemedText>

      <ThemedText>Thá»i gian</ThemedText>
      <TextInput value={time} onChangeText={setTime} style={inputStyle} />

      <ThemedText>KhÃ¡ch hÃ ng</ThemedText>
      <TextInput value={client} onChangeText={setClient} style={inputStyle} />

      <ThemedText>Dá»‹ch vá»¥</ThemedText>
      <TextInput value={service} onChangeText={setService} style={inputStyle} />

      <ThemedText>NhÃ¢n viÃªn</ThemedText>
      <TextInput value={staff} onChangeText={setStaff} style={inputStyle} />

      <ThemedText>Tráº¡ng thÃ¡i</ThemedText>
      <TextInput value={status} onChangeText={setStatus} style={inputStyle} />

      <View style={[styles.actions, { gap: s(8), marginTop: s(12) }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.buttonSecondary, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(12) }]}>
          <ThemedText>Há»§y</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={[styles.buttonPrimary, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(12) }]}>
          <ThemedText style={{ color: '#fff', fontSize: fs(16) }}>LÆ°u</ThemedText>
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
  buttonSecondary: {
    minHeight: 44,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
