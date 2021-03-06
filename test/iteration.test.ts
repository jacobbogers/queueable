import { map, filter, reduce } from '../src/iteration';

const numbers = async function*() {
  yield* [1, 2, 3, 4];
};

it('maps', async () => {
  const ns = numbers();
  const result = map(ns, String);
  expect(await Promise.all([result.next(), result.next()])).toEqual([
    { done: false, value: '1' },
    { done: false, value: '2' },
  ]);
});

it('filters', async () => {
  const ns = numbers();
  const result = filter(i => i > 1, ns);
  expect(await Promise.all([result.next(), result.next()])).toEqual([
    { done: false, value: 2 },
    { done: false, value: 3 },
  ]);
});

it('reduces', async () => {
  const ns = numbers();
  const result = reduce((a, b) => a + b, 0, ns);
  expect(await result).toBe(10);
});
