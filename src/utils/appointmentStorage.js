import { addAppointment, getAppointments } from './appointmentsStorage';

export const saveAppointment = async (newAppointment) => {
  try {
    await addAppointment(newAppointment);
    return getAppointments();
  } catch (error) {
    console.error('Lỗi khi lưu lịch hẹn:', error);
    return null;
  }
};

export { getAppointments };
