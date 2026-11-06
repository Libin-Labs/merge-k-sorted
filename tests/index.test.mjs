import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('merges three arrays', () => {
  assert.deepEqual(
    api.mergeKSorted([
      [1, 4],
      [2, 5],
      [3, 6],
    ]),
    [1, 2, 3, 4, 5, 6],
  );
});
test('handles empty inputs', () => {
  assert.deepEqual(api.mergeKSorted([[], [1], []]), [1]);
});
test('handles no arrays', () => {
  assert.deepEqual(api.mergeKSorted([]), []);
});
test('keeps stable source ties', () => {
  assert.deepEqual(
    api.mergeKSorted([['a'], ['b']], (a, b) => 0),
    ['a', 'b'],
  );
});
test('supports reverse comparator', () => {
  assert.deepEqual(
    api.mergeKSorted(
      [
        [9, 5],
        [8, 4],
      ],
      (a, b) => b - a,
    ),
    [9, 8, 5, 4],
  );
});
test('rejects non-array input', () => {
  assert.throws(() => api.mergeKSorted('arrays'), TypeError);
});
