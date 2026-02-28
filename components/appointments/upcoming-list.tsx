import AppointmentItem from '@/components/appointments/appointment-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

type Appointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  staff: string;
  status?: string;
};

export default function UpcomingList({ data }: { data?: Appointment[] }) {
  const [list, setList] = useState<Appointment[]>([]);
  const { width } = useWindowDimensions();
  const isSmall = width < 640;

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const raw = await AsyncStorage.getItem('appointments');
        const parsed: Appointment[] | null = raw ? JSON.parse(raw) : null;
        if (mounted) setList(data ?? parsed ?? []);
      } catch (_e) {
        if (mounted) setList(data ?? []);
      }
    }

    load();

    const id = setInterval(load, 3000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [data]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Sắp tới</ThemedText>
      {list.length === 0 ? (
        <ThemedText>Không có lịch đang chờ. Vui lòng thêm lịch từ trang quản trị.</ThemedText>
      ) : (
        list.map((a) => <AppointmentItem key={a.id} appointment={a} />)
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, marginTop: 12 },
});

