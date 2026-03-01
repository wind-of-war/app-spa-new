import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useResponsive } from '@/hooks/use-responsive';
import { addAppointment } from '@/src/utils/appointmentsStorage';
import { getServices } from '@/src/utils/servicesStorage';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HOURS = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
const PERIODS = ['AM', 'PM'] as const;

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
const WHEEL_PADDING = ITEM_HEIGHT * Math.floor(VISIBLE_ROWS / 2);

type WheelPickerProps = {
  values: readonly string[];
  selected: string;
  onChange: (value: string) => void;
};

function WheelPicker({ values, selected, onChange }: WheelPickerProps) {
  const selectedIndex = useMemo(() => {
    const index = values.findIndex((value) => value === selected);
    return index >= 0 ? index : 0;
  }, [selected, values]);

  const onScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      const safeIndex = Math.max(0, Math.min(values.length - 1, index));
      const nextValue = values[safeIndex];
      if (nextValue && nextValue !== selected) {
        onChange(nextValue);
      }
    },
    [onChange, selected, values]
  );

  return (
    <View style={styles.wheelBox}>
      <View style={styles.wheelCenterMark} />
      <FlatList
        data={values}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: WHEEL_PADDING }}
        style={{ height: WHEEL_HEIGHT }}
        initialScrollIndex={selectedIndex}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.wheelItem}>
            <ThemedText style={item === selected ? styles.optionActive : styles.optionText}>{item}</ThemedText>
          </View>
        )}
      />
    </View>
  );
}

export default function AddAppointment() {
  const { s, fs } = useResponsive();
  const router = useRouter();
  const [time, setTime] = useState('');
  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [staff, setStaff] = useState('');
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [hour, setHour] = useState('10');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>('AM');

  const [isServicePickerOpen, setIsServicePickerOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] = useState('');

  useEffect(() => {
    async function loadServices() {
      const list = await getServices();
      const names = list.map((item) => item.name);
      setServiceOptions(names);

      if (names.length > 0) {
        const fallback = names[0];
        setSelectedServiceOption((prev) => prev || fallback);
        setService((prev) => prev || fallback);
      }
    }

    loadServices();
  }, []);

  async function onSave() {
    if (!time || !client) return;

    try {
      await addAppointment({
        time,
        client,
        service,
        staff,
        status: 'Đang chờ',
      });
      router.back();
    } catch (error) {
      console.warn('Failed to save appointment', error);
    }
  }

  function onConfirmTime() {
    setTime(`${hour}:${minute} ${period}`);
    setIsTimePickerOpen(false);
  }

  function onConfirmService() {
    setService(selectedServiceOption);
    setIsServicePickerOpen(false);
  }

  return (
    <ThemedView style={[styles.container, { gap: s(8), padding: s(12) }]}>
      <ThemedText type="title" style={{ fontSize: fs(27) }}>Thêm lịch hẹn</ThemedText>

      <ThemedText>Thời gian</ThemedText>
      <TouchableOpacity style={[styles.input, { minHeight: s(44), borderRadius: s(6), padding: s(10) }]} onPress={() => setIsTimePickerOpen(true)}>
        <ThemedText style={time ? styles.timeValue : styles.placeholder}>{time || 'Chọn giờ'}</ThemedText>
      </TouchableOpacity>

      <ThemedText>Khách hàng</ThemedText>
      <TextInput value={client} onChangeText={setClient} style={[styles.input, { minHeight: s(44), borderRadius: s(6), padding: s(10) }]} placeholder="Tên khách" />

      <ThemedText>Dịch vụ</ThemedText>
      <TouchableOpacity
        style={[styles.input, serviceOptions.length === 0 && styles.inputDisabled]}
        disabled={serviceOptions.length === 0}
        onPress={() => setIsServicePickerOpen(true)}>
        <ThemedText style={service ? styles.timeValue : styles.placeholder}>
          {serviceOptions.length === 0 ? 'Chưa có dịch vụ (vào trang Dịch vụ để thêm)' : service || 'Chọn dịch vụ'}
        </ThemedText>
      </TouchableOpacity>

      <ThemedText>Nhân viên</ThemedText>
      <TextInput value={staff} onChangeText={setStaff} style={[styles.input, { minHeight: s(44), borderRadius: s(6), padding: s(10) }]} placeholder="Nhân viên" />

      <View style={[styles.actions, { gap: s(8), marginTop: s(12) }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.buttonSecondary, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(12) }]}>
          <ThemedText>Hủy</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={[styles.buttonPrimary, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(12) }]}>
          <ThemedText style={{ color: '#fff', fontSize: fs(16) }}>Lưu</ThemedText>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isTimePickerOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsTimePickerOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ThemedText type="subtitle">Chọn thời gian</ThemedText>

            <View style={styles.pickerRow}>
              <WheelPicker values={HOURS} selected={hour} onChange={setHour} />
              <WheelPicker values={MINUTES} selected={minute} onChange={setMinute} />
              <WheelPicker
                values={PERIODS}
                selected={period}
                onChange={(value) => setPeriod(value as (typeof PERIODS)[number])}
              />
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={() => setIsTimePickerOpen(false)}>
                <ThemedText>Đóng</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPrimary} onPress={onConfirmTime}>
                <ThemedText style={{ color: '#fff' }}>Xác nhận</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isServicePickerOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsServicePickerOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ThemedText type="subtitle">Chọn dịch vụ</ThemedText>

            <View style={styles.singlePickerWrap}>
              <WheelPicker values={serviceOptions} selected={selectedServiceOption} onChange={setSelectedServiceOption} />
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={() => setIsServicePickerOpen(false)}>
                <ThemedText>Đóng</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPrimary} onPress={onConfirmService}>
                <ThemedText style={{ color: '#fff' }}>Xác nhận</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 8, padding: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 10,
    borderRadius: 6,
    minHeight: 44,
    justifyContent: 'center',
  },
  inputDisabled: { backgroundColor: '#f3f4f6' },
  placeholder: { color: '#9ca3af' },
  timeValue: { color: '#111827' },
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  pickerRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  singlePickerWrap: { marginTop: 10 },
  wheelBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f9fafb',
  },
  wheelCenterMark: {
    position: 'absolute',
    top: WHEEL_PADDING,
    left: 6,
    right: 6,
    height: ITEM_HEIGHT,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    backgroundColor: '#eff6ff',
    zIndex: 1,
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: '#6b7280',
  },
  optionActive: {
    color: '#0a7ea4',
    fontWeight: '700',
  },
});
