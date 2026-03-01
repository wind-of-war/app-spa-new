import AsyncStorage from '@react-native-async-storage/async-storage';

export const SERVICES_KEY = 'services';

export type SpaService = {
  id: string;
  name: string;
};

function toName(value: unknown): string {
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

function normalizeService(input: Partial<SpaService>, fallbackId?: string): SpaService | null {
  const name = toName(input.name);
  if (!name) return null;

  return {
    id: toName(input.id) || fallbackId || `${Date.now()}`,
    name,
  };
}

export async function getServices(): Promise<SpaService[]> {
  const raw = await AsyncStorage.getItem(SERVICES_KEY);
  const parsed = parseArray(raw) as Partial<SpaService>[];

  const map = new Map<string, SpaService>();
  parsed.forEach((item, index) => {
    const normalized = normalizeService(item, `${Date.now()}-${index}`);
    if (normalized && !map.has(normalized.name.toLowerCase())) {
      map.set(normalized.name.toLowerCase(), normalized);
    }
  });

  return Array.from(map.values());
}

export async function addService(name: string): Promise<SpaService[] | null> {
  const trimmed = toName(name);
  if (!trimmed) return null;

  const existing = await getServices();
  const duplicated = existing.some((item) => item.name.toLowerCase() === trimmed.toLowerCase());
  if (duplicated) return existing;

  const next: SpaService[] = [{ id: `${Date.now()}`, name: trimmed }, ...existing];
  await AsyncStorage.setItem(SERVICES_KEY, JSON.stringify(next));
  return next;
}

export async function deleteService(id: string): Promise<SpaService[]> {
  const existing = await getServices();
  const next = existing.filter((item) => item.id !== id);
  await AsyncStorage.setItem(SERVICES_KEY, JSON.stringify(next));
  return next;
}
