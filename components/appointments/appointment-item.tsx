import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppointmentItem({
  appointment,
}: {
  appointment: {
    id: string;
    time: string;
    client: string;
    service: string;
    staff: string;
    status?: string;
  };
}) {
  const a = appointment;

  return (
    <ThemedView style={styles.item}>
      <View style={styles.timeBox}>
        <ThemedText type="defaultSemiBold">{a.time}</ThemedText>
        <ThemedText>{a.status}</ThemedText>
      </View>
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold">{a.client}</ThemedText>
        <ThemedText>{`${a.service} • ${a.staff}`}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  timeBox: { width: 120 },
  info: { flex: 1 },
});
