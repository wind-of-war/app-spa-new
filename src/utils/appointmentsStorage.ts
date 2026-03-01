import AsyncStorage from '@react-native-async-storage/async-storage';

export const APPOINTMENTS_KEY = 'appointments';
export const LEGACY_KEY = 'my_appointments';

const DEFAULT_SERVICE = 'Chưa chọn dịch vụ';
const DEFAULT_STAFF = 'Chưa phân công';
const DEFAULT_STATUS = 'Đang chờ';
const DEFAULT_TIME = 'Chưa đặt thời gian';
const DEFAULT_CLIENT = 'Khách lẻ';

export type Appointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  staff: string;
  status: string;
};

export type LegacyAppointment = {
  id?: string;
  title?: string;
  date?: string;
};

type AppointmentInput = Partial<Appointment> & {
  title?: string;
  date?: string;
};

let migratePromise: Promise<void> | null = null;

function toSafeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function parseArray(raw: string | null): unknown[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function normalizeAppointment(input: AppointmentInput, fallbackId?: string): Appointment {
  const id = toSafeString(input.id) || fallbackId || `${Date.now()}`;
  const client = toSafeString(input.client) || toSafeString(input.title) || DEFAULT_CLIENT;
  const time = toSafeString(input.time) || toSafeString(input.date) || DEFAULT_TIME;

  return {
    id,
    time,
    client,
    service: toSafeString(input.service) || DEFAULT_SERVICE,
    staff: toSafeString(input.staff) || DEFAULT_STAFF,
    status: toSafeString(input.status) || DEFAULT_STATUS,
  };
}

async function migrateLegacyIfNeeded(): Promise<void> {
  const [appointmentsRaw, legacyRaw] = await Promise.all([
    AsyncStorage.getItem(APPOINTMENTS_KEY),
    AsyncStorage.getItem(LEGACY_KEY),
  ]);

  const existingParsed = parseArray(appointmentsRaw) as AppointmentInput[];
  const legacyParsed = parseArray(legacyRaw) as LegacyAppointment[];

  const normalizedExisting = existingParsed.map((item, index) =>
    normalizeAppointment(item, `${Date.now()}-${index}`)
  );
  const normalizedLegacy = legacyParsed.map((item, index) =>
    normalizeAppointment(
      {
        id: item.id,
        client: item.title,
        time: item.date,
      },
      `${Date.now()}-legacy-${index}`
    )
  );

  const deduped = new Map<string, Appointment>();
  normalizedExisting.forEach((item) => {
    if (!deduped.has(item.id)) deduped.set(item.id, item);
  });
  normalizedLegacy.forEach((item) => {
    if (!deduped.has(item.id)) deduped.set(item.id, item);
  });

  const merged = Array.from(deduped.values());
  const shouldRewriteAppointments =
    merged.length !== existingParsed.length || normalizedExisting.some((item, index) => {
      const original = existingParsed[index];
      return !original || toSafeString((original as AppointmentInput).id) !== item.id;
    });

  if (shouldRewriteAppointments || legacyParsed.length > 0) {
    await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(merged));
  }

  if (legacyRaw !== null) {
    await AsyncStorage.removeItem(LEGACY_KEY);
  }
}

async function ensureMigrated(): Promise<void> {
  if (!migratePromise) {
    migratePromise = migrateLegacyIfNeeded().catch((error) => {
      migratePromise = null;
      throw error;
    });
  }

  await migratePromise;
}

export async function getAppointments(): Promise<Appointment[]> {
  await ensureMigrated();
  const raw = await AsyncStorage.getItem(APPOINTMENTS_KEY);
  const parsed = parseArray(raw) as AppointmentInput[];
  return parsed.map((item, index) => normalizeAppointment(item, `${Date.now()}-${index}`));
}

export async function addAppointment(input: AppointmentInput): Promise<Appointment> {
  await ensureMigrated();
  const existing = await getAppointments();
  const created = normalizeAppointment(input);
  const next = [created, ...existing];
  await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(next));
  return created;
}

export async function updateAppointment(
  id: string,
  patch: Partial<Appointment>
): Promise<Appointment | null> {
  await ensureMigrated();
  const existing = await getAppointments();
  let updated: Appointment | null = null;

  const next = existing.map((item) => {
    if (item.id !== id) return item;
    updated = normalizeAppointment({ ...item, ...patch }, item.id);
    return updated;
  });

  if (!updated) return null;
  await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(next));
  return updated;
}

export async function deleteAppointment(id: string): Promise<Appointment[]> {
  await ensureMigrated();
  const existing = await getAppointments();
  const next = existing.filter((item) => item.id !== id);
  await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(next));
  return next;
}
