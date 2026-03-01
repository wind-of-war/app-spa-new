import { ThemedView } from '@/components/themed-view';
import DashboardCard from '@/components/ui/dashboard-card';
import { Appointment, getAppointments } from '@/src/utils/appointmentsStorage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function StatsPanel() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const parsed = await getAppointments();
        if (mounted) setAppointments(parsed);
      } catch {
        if (mounted) setAppointments([]);
      }
    }

    load();
    const id = setInterval(load, 3000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const total = appointments.length;
  const confirmed = appointments.filter((appointment) => appointment.status.toLowerCase().includes('xác')).length;
  const upcoming = appointments.slice(0, 5).length;

  return (
    <ThemedView style={styles.row}>
      <DashboardCard title="Tổng lịch" value={`${total}`} delta={`${confirmed} xác nhận`} icon="house.fill" />
      <DashboardCard title="Sắp tới" value={`${upcoming}`} delta="--" icon="paperplane.fill" />
      <DashboardCard title="Khách mới" value="--" delta="--" icon="chevron.left.forwardslash.chevron.right" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, marginVertical: 12, flexWrap: 'wrap', justifyContent: 'space-between' },
});
