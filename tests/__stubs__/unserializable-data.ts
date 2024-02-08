import type { JsonValue } from 'type-fest'

type TestData = {
  jsonUnserializable: Record<string, unknown>
  serialized: JsonValue
}

export const oneLevelDeep: TestData = {
  jsonUnserializable: {
    a: 'bar',
    b: 123,
    c: new Date('2024-02-08T04:17:54.902Z'),
    d: undefined,
  },
  serialized: {
    a: 'bar',
    b: 123,
    c: '2024-02-08T04:17:54.902Z',
    d: null,
  },
}

export const fiveLevelsDeep: TestData = {
  jsonUnserializable: {
    a: 'bar',
    b: 123,
    c: new Date('2024-02-08T04:17:54.902Z'),
    d: undefined,
    e: {
      a: 'bar',
      b: 123,
      c: new Date('2024-02-08T04:17:54.902Z'),
      d: undefined,
      e: {
        a: 'bar',
        b: 123,
        c: new Date('2024-02-08T04:17:54.902Z'),
        d: undefined,
        e: {
          a: 'bar',
          b: 123,
          c: new Date('2024-02-08T04:17:54.902Z'),
          d: undefined,
          e: {
            a: 'bar',
            b: 123,
            c: new Date('2024-02-08T04:17:54.902Z'),
            d: undefined,
          },
        },
      },
    },
  },
  serialized: {
    a: 'bar',
    b: 123,
    c: '2024-02-08T04:17:54.902Z',
    d: null,
    e: {
      a: 'bar',
      b: 123,
      c: '2024-02-08T04:17:54.902Z',
      d: null,
      e: {
        a: 'bar',
        b: 123,
        c: '2024-02-08T04:17:54.902Z',
        d: null,
        e: {
          a: 'bar',
          b: 123,
          c: '2024-02-08T04:17:54.902Z',
          d: null,
          e: {
            a: 'bar',
            b: 123,
            c: '2024-02-08T04:17:54.902Z',
            d: null,
          },
        },
      },
    },
  },
}

export const oneLevelDeepWithArrays: TestData = {
  jsonUnserializable: {
    a: 'bar',
    b: 123,
    c: new Date('2024-02-08T04:17:54.902Z'),
    d: undefined,
    e: [1, 2, 3],
    f: ['foo', 'bar', 'baz'],
  },
  serialized: {
    a: 'bar',
    b: 123,
    c: '2024-02-08T04:17:54.902Z',
    d: null,
    e: [1, 2, 3],
    f: ['foo', 'bar', 'baz'],
  },
}

export const fiveLevelsDeepWithArrays: TestData = {
  jsonUnserializable: {
    a: 'bar',
    b: 123,
    c: new Date('2024-02-08T04:17:54.902Z'),
    d: undefined,
    e: [1, 2, 3],
    f: ['foo', 'bar', 'baz'],
    g: {
      a: 'bar',
      b: 123,
      c: new Date('2024-02-08T04:17:54.902Z'),
      d: undefined,
      e: [1, 2, 3],
      f: ['foo', 'bar', 'baz'],
      g: {
        a: 'bar',
        b: 123,
        c: new Date('2024-02-08T04:17:54.902Z'),
        d: undefined,
        e: [1, 2, 3],
        f: ['foo', 'bar', 'baz'],
        g: {
          a: 'bar',
          b: 123,
          c: new Date('2024-02-08T04:17:54.902Z'),
          d: undefined,
          e: [1, 2, 3],
          f: ['foo', 'bar', 'baz'],
          g: {
            a: 'bar',
            b: 123,
            c: new Date('2024-02-08T04:17:54.902Z'),
            d: undefined,
            e: [1, 2, 3],
            f: ['foo', 'bar', 'baz'],
          },
        },
      },
    },
  },
  serialized: {
    a: 'bar',
    b: 123,
    c: '2024-02-08T04:17:54.902Z',
    d: null,
    e: [1, 2, 3],
    f: ['foo', 'bar', 'baz'],
    g: {
      a: 'bar',
      b: 123,
      c: '2024-02-08T04:17:54.902Z',
      d: null,
      e: [1, 2, 3],
      f: ['foo', 'bar', 'baz'],
      g: {
        a: 'bar',
        b: 123,
        c: '2024-02-08T04:17:54.902Z',
        d: null,
        e: [1, 2, 3],
        f: ['foo', 'bar', 'baz'],
        g: {
          a: 'bar',
          b: 123,
          c: '2024-02-08T04:17:54.902Z',
          d: null,
          e: [1, 2, 3],
          f: ['foo', 'bar', 'baz'],
          g: {
            a: 'bar',
            b: 123,
            c: '2024-02-08T04:17:54.902Z',
            d: null,
            e: [1, 2, 3],
            f: ['foo', 'bar', 'baz'],
          },
        },
      },
    },
  },
}

export const oneLevelDeepWithMixedArrays: TestData = {
  jsonUnserializable: {
    a: [
      'bar',
      123,
      new Date('2024-02-08T04:17:54.902Z'),
      undefined,
      {
        b: ['bar', 123, new Date('2024-02-08T04:17:54.902Z'), undefined],
      },
    ],
  },
  serialized: {
    a: [
      'bar',
      123,
      '2024-02-08T04:17:54.902Z',
      null,
      {
        b: ['bar', 123, '2024-02-08T04:17:54.902Z', null],
      },
    ],
  },
}

export const fiveLevelsDeepWithMixedArrays: TestData = {
  jsonUnserializable: {
    a: [
      'bar',
      123,
      new Date('2024-02-08T04:17:54.902Z'),
      undefined,
      {
        b: [
          'bar',
          123,
          new Date('2024-02-08T04:17:54.902Z'),
          undefined,
          {
            c: [
              'bar',
              123,
              new Date('2024-02-08T04:17:54.902Z'),
              undefined,
              {
                d: [
                  'bar',
                  123,
                  new Date('2024-02-08T04:17:54.902Z'),
                  undefined,
                  {
                    e: ['bar', 123, new Date('2024-02-08T04:17:54.902Z'), undefined],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  serialized: {
    a: [
      'bar',
      123,
      '2024-02-08T04:17:54.902Z',
      null,
      {
        b: [
          'bar',
          123,
          '2024-02-08T04:17:54.902Z',
          null,
          {
            c: [
              'bar',
              123,
              '2024-02-08T04:17:54.902Z',
              null,
              {
                d: [
                  'bar',
                  123,
                  '2024-02-08T04:17:54.902Z',
                  null,
                  {
                    e: ['bar', 123, '2024-02-08T04:17:54.902Z', null],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export function createCircularReferenceUnserializableData() {
  const a: Record<string, unknown> = {
    ...oneLevelDeep.jsonUnserializable,
  }
  const b: Record<string, unknown> = {
    ...oneLevelDeep.jsonUnserializable,
  }
  a.circularProperty = b
  b.circularProperty = a
  return a
}
