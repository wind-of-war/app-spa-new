import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

// NOTE: This component uses `react-native-chart-kit` and `react-native-svg`.
// Install with: `npm install react-native-chart-kit react-native-svg`
import { BarChart, LineChart } from 'react-native-chart-kit';

type Appointment = { id: string };

export default function AppointmentsChart() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [labelsState, setLabels] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const raw = await AsyncStorage.getItem('appointments');
        const list = raw ? (JSON.parse(raw) as Appointment[]) : [];

        // IDs are timestamps (Date.now()). Group by day.
        const counts: Record<string, number> = {};
        list.forEach((a) => {
          const ts = Number(a.id) || Date.now();
          const d = new Date(ts).toISOString().slice(0, 10);
          counts[d] = (counts[d] || 0) + 1;
        });

        const sorted = Object.keys(counts).sort();
        const points = sorted.map((k) => counts[k]);
        const labels = sorted.map((s) => s.slice(5)); // MM-DD
        if (mounted) {
          setDataPoints(points.length ? points : [0]);
          setLabels(labels.length ? labels : ['-']);
        }
      } catch (_e) {
        if (mounted) setDataPoints([0]);
      }
    }

    load();
    const id = setInterval(load, 3000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const screenWidth = Math.min(600, Dimensions.get('window').width - 40);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Hoạt động theo ngày</ThemedText>
      <LineChart
        data={{ labels: labelsState.length ? labelsState : dataPoints.map((_, i) => `${i + 1}`), datasets: [{ data: dataPoints }] }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(10,126,164, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(75,85,99, ${opacity})`,
        }}
        bezier
        style={{ borderRadius: 12 }}
      />

      <View style={{ height: 12 }} />

      <BarChart
        data={{ labels: labelsState.length ? labelsState : dataPoints.map((_, i) => `${i + 1}`), datasets: [{ data: dataPoints }] }}
        width={screenWidth}
        height={180}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(10,126,164, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(75,85,99, ${opacity})`,
        }}
        style={{ borderRadius: 12 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 12 },
});
