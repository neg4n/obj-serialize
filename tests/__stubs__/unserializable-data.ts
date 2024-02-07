export const oneLevelDeepUnserializableData = {
  a: 'bar',
  b: 123,
  c: new Date(),
  d: undefined,
}

export function createCircularReferenceUnserializableData() {
  const a: Record<string, unknown> = {
    ...oneLevelDeepUnserializableData,
  }
  const b: Record<string, unknown> = {
    ...oneLevelDeepUnserializableData,
  }
  a.circularProperty = b
  b.circularProperty = a
  return a
}

export const tenLevelDeepUnserializableData = {
  a: {
    j: 'bar',
    k: 123,
    l: new Date(),
    m: undefined,
    b: {
      j: 'bar',
      k: 123,
      l: new Date(),
      m: undefined,
      c: {
        j: 'bar',
        k: 123,
        l: new Date(),
        m: undefined,
        d: {
          j: 'bar',
          k: 123,
          l: new Date(),
          m: undefined,
          e: {
            j: 'bar',
            k: 123,
            l: new Date(),
            m: undefined,
            f: {
              j: 'bar',
              k: 123,
              l: new Date(),
              m: undefined,
              g: {
                j: 'bar',
                k: 123,
                l: new Date(),
                m: undefined,
                h: {
                  j: 'bar',
                  k: 123,
                  l: new Date(),
                  m: undefined,
                  i: {
                    j: 'bar',
                    k: 123,
                    l: new Date(),
                    m: undefined,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
