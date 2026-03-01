import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useResponsive } from '@/hooks/use-responsive';
import { addService, deleteService, getServices, SpaService } from '@/src/utils/servicesStorage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Services() {
  const { s, fs } = useResponsive();
  const router = useRouter();
  const { isAdmin } = useAdminAuth();
  const [name, setName] = useState('');
  const [services, setServices] = useState<SpaService[]>([]);

  useEffect(() => {
    if (isAdmin === false) {
      router.replace('/admin/login');
    }
  }, [isAdmin, router]);

  async function load() {
    const list = await getServices();
    setServices(list);
  }

  useEffect(() => {
    load();
  }, []);

  async function onAdd() {
    if (!name.trim()) return;

    const next = await addService(name);
    if (next) {
      setServices(next);
      setName('');
    }
  }

  async function onDelete(id: string) {
    Alert.alert('Xóa dịch vụ', 'Bạn có chắc muốn xóa dịch vụ này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const next = await deleteService(id);
          setServices(next);
        },
      },
    ]);
  }

  return (
    <ThemedView style={[styles.container, { gap: s(12), padding: s(12) }]}>
      <ThemedText type="title" style={{ fontSize: fs(27) }}>Dịch vụ</ThemedText>
      <ThemedText style={{ fontSize: fs(16) }}>Quản trị thêm dịch vụ ở đây để màn đặt lịch chọn bằng cuộn.</ThemedText>

      <View style={[styles.addRow, { gap: s(8) }]}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={[styles.input, { minHeight: s(44), padding: s(10), borderRadius: s(8) }]}
          placeholder="Tên dịch vụ"
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />
        <TouchableOpacity onPress={onAdd} style={[styles.buttonPrimary, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(14) }]}>
          <ThemedText style={{ color: '#fff', fontSize: fs(16) }}>Thêm</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8, paddingTop: 8 }}
        renderItem={({ item }) => (
          <View style={[styles.row, { borderRadius: s(10), paddingHorizontal: s(12), paddingVertical: s(10) }]}>
            <ThemedText>{item.name}</ThemedText>
            <TouchableOpacity onPress={() => onDelete(item.id)} style={[styles.buttonDanger, { minHeight: s(44), borderRadius: s(8), paddingHorizontal: s(10) }]}>
              <ThemedText>Xóa</ThemedText>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<ThemedText>Chưa có dịch vụ nào.</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 12 },
  addRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', padding: 10, borderRadius: 8, minHeight: 44 },
  buttonPrimary: {
    minHeight: 44,
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
  },
  row: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonDanger: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    justifyContent: 'center',
  },
});
