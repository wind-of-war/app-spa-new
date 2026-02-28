import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function DashboardCard({
  title,
  value,
  delta,
  color,
  icon,
}: {
  title: string;
  value: string;
  delta?: string;
  color?: string;
  icon?: React.ComponentProps<typeof IconSymbol>['name'];
}) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.row}>
        {icon ? <IconSymbol name={icon as any} size={28} color={color ?? '#0a7ea4'} /> : null}
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
      </View>

      <ThemedText type="title" style={styles.value}>
        {value}
      </ThemedText>

      {delta ? (
        <ThemedText style={[styles.delta, { color: color ?? '#0a7ea4' }]}>{delta}</ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    minWidth: 140,
    flex: 1,
    gap: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 14 },
  value: { fontSize: 22, fontWeight: '700' },
  delta: { fontSize: 13 },
});
