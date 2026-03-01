import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { addAppointment, getAppointments } from '../utils/appointmentsStorage';

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointmentTitle, setNewAppointmentTitle] = useState('');
  const [newAppointmentDate, setNewAppointmentDate] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const storedAppointments = await getAppointments();
    setAppointments(storedAppointments);
  };

  const handleSaveAppointment = async () => {
    if (newAppointmentTitle.trim() === '' || newAppointmentDate.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tiêu đề và ngày hẹn.');
      return;
    }

    await addAppointment({
      client: newAppointmentTitle,
      time: newAppointmentDate,
    });

    setNewAppointmentTitle('');
    setNewAppointmentDate('');
    Alert.alert('Thành công', 'Lịch hẹn đã được lưu!');
    loadAppointments();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thêm lịch hẹn mới</Text>
      <TextInput
        placeholder="Tiêu đề cuộc hẹn"
        value={newAppointmentTitle}
        onChangeText={setNewAppointmentTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Ngày (ví dụ: 2026-03-10)"
        value={newAppointmentDate}
        onChangeText={setNewAppointmentDate}
        style={styles.input}
      />
      <Button title="Lưu lịch hẹn" onPress={handleSaveAppointment} />

      <Text style={styles.subHeader}>Các lịch hẹn đã lưu</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text style={styles.appointmentTitle}>{item.client}</Text>
            <Text>Ngày: {item.time}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có lịch hẹn nào được lưu.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  appointmentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    marginBottom: 5,
    borderRadius: 5,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default AppointmentScreen;
