export function mergeKSorted<T>(
  arrays: readonly (readonly T[])[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0),
): T[] {
  if (
    !Array.isArray(arrays) ||
    arrays.some((a) => !Array.isArray(a)) ||
    typeof compare !== 'function'
  )
    throw new TypeError('Expected sorted arrays and comparator');
  if (arrays.length > 10000 || arrays.reduce((n, a) => n + a.length, 0) > 1000000)
    throw new RangeError('Merge input limit exceeded');
  const positions = arrays.map(() => 0),
    out: T[] = [];
  while (true) {
    let best = -1;
    for (let i = 0; i < arrays.length; i++) {
      const pos = positions[i]!;
      if (pos >= arrays[i]!.length) continue;
      if (best < 0 || compare(arrays[i]![pos]!, arrays[best]![positions[best]!]!) < 0) best = i;
    }
    if (best < 0) return out;
    const position = positions[best]!;
    out.push(arrays[best]![position]!);
    positions[best] = position + 1;
  }
}
