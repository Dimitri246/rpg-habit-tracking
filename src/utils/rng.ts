export function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function sample<T>(arr: T[]): T {
  return arr[randomInt(arr.length)];
}

export function sampleSize<T>(arr: T[], size: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  while (copy.length && result.length < size) {
    const idx = randomInt(copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}
