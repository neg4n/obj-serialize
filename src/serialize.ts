import { flatten, unflatten } from 'flat'

export const SkipSerialization = Symbol(
  'ba1894562a5b3e00de68679b5e01fed0de0a0aac6da459729c2f4d665d928ccc',
)

type SerializationRules = <T>(
  unserializedValue: T,
) => string | number | boolean | null | undefined | typeof SkipSerialization

export function serialize(data: Record<string, unknown>, rules: SerializationRules) {
  return unflatten(
    Object.entries(flatten(data) as Record<string, unknown>).reduce(
      (newData, [key, value]) => {
        let oldValue = value
        const serialized = rules(value)

        if (typeof serialized === typeof SkipSerialization) {
          newData[key] = oldValue
        } else if (serialized !== oldValue) {
          newData[key] = serialized
        }

        return newData
      },
      {} as Record<string, unknown>,
    ),
  )
}
