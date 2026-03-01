import AppointmentItem from '@/components/appointments/appointment-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Appointment, getAppointments } from '@/src/utils/appointmentsStorage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function UpcomingList({ data }: { data?: Appointment[] }) {
  const [list, setList] = useState<Appointment[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const parsed = await getAppointments();
        if (mounted) setList(data ?? parsed);
      } catch {
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
        list.map((appointment) => <AppointmentItem key={appointment.id} appointment={appointment} />)
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, marginTop: 12 },
});
