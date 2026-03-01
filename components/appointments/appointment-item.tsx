import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Appointment } from '@/src/utils/appointmentsStorage';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppointmentItem({ appointment }: { appointment: Appointment }) {
  const item = appointment;

  return (
    <ThemedView style={styles.item}>
      <View style={styles.timeBox}>
        <ThemedText type="defaultSemiBold">{item.time}</ThemedText>
        <ThemedText>{item.status}</ThemedText>
      </View>
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold">{item.client}</ThemedText>
        <ThemedText>{`${item.service} • ${item.staff}`}</ThemedText>
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
