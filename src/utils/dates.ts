export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isNewDay(lastKey?: string): boolean {
  return lastKey !== todayKey();
}
