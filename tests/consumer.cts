import * as api from '@lp-labs/merge-k-sorted';
import { mergeKSorted } from '@lp-labs/merge-k-sorted';
console.log(
  mergeKSorted([
    [1, 4],
    [2, 5],
    [3, 6],
  ]),
);
// @ts-expect-error invalid argument must be rejected by declarations
api.mergeKSorted('arrays');
